let lastTimestamp = 0;
const BATCH_SIZE = 10;
const FLUSH_INTERVAL = 250;

const getMonotonicTimestamp = (): string => {
  const now = Date.now() * 1000000; // Convert to nanoseconds
  lastTimestamp = Math.max(now, lastTimestamp + 1);
  return lastTimestamp.toString();
};

const sendToLoki = async (
  config: LoggerConfig,
  batch: LogBatch
): Promise<void> => {
  if (!config.lokiUrl || Object.keys(batch).length === 0) return;

  const logEntry: LokiLogEntry = {
    streams: Object.entries(batch).map(([key, values]) => ({
      stream: { level: key, ...config.labels },
      values,
    })),
  };

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (config.lokiUsername && config.lokiPassword) {
    const authString = btoa(`${config.lokiUsername}:${config.lokiPassword}`);
    headers["Authorization"] = `Basic ${authString}`;
  }

  try {
    const response = await fetch(`${config.lokiUrl}/loki/api/v1/push`, {
      method: "POST",
      headers,
      body: JSON.stringify(logEntry),
    });

    if (!response.ok) {
      throw new Error(`Failed to send logs to Loki: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error sending logs to Loki:", error);
    throw error; // Re-throw to allow caller to handle
  }
};

const createLogger = (): Logger => {
  const config: LoggerConfig = {
    lokiUrl: process.env.LOKI_URL || "",
    lokiUsername: process.env.LOKI_USERNAME || "",
    lokiPassword: process.env.LOKI_PASSWORD || "",
    labels: {
      application: "sc-og",
      logger: "root",
    },
    batchSize: BATCH_SIZE,
    flushInterval: FLUSH_INTERVAL,
  };

  if (!config.lokiUrl) {
    console.warn("LOKI_URL is not set. Logs will only be output to console.");
  }

  let batch: LogBatch = {};
  let flushPromise: Promise<void> | null = null;
  let timeout: NodeJS.Timeout | null = null;

  const flush = async (): Promise<void> => {
    if (flushPromise) return flushPromise;

    const batchToSend = batch;
    batch = {};
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    flushPromise = sendToLoki(config, batchToSend).finally(() => {
      flushPromise = null;
    });

    return flushPromise;
  };

  const scheduleFlush = () => {
    if (!timeout) {
      timeout = setTimeout(() => flush(), config.flushInterval);
    }
  };

  const addToBatch = (level: string, message: string) => {
    if (!batch[level]) {
      batch[level] = [];
    }
    batch[level].push([getMonotonicTimestamp(), message]);

    if (batch[level].length >= config.batchSize) {
      flush();
    } else {
      scheduleFlush();
    }
  };

  const logAndBatch = (level: "info" | "error", message: any) => {
    const logMessage =
      typeof message === "string" ? message : JSON.stringify(message);
    const consoleMethod = level === "info" ? console.log : console.error;
    consoleMethod(logMessage);
    addToBatch(level, logMessage);
  };

  // Handle application shutdown
  if (typeof process !== "undefined" && process.on) {
    ["SIGINT", "SIGTERM", "beforeExit"].forEach((signal) => {
      process.on(signal, () => {
        flush().finally(() => process.exit());
      });
    });
  }

  return {
    info: (message: any) => logAndBatch("info", message),
    error: (message: any) => logAndBatch("error", message),
    flush,
  };
};

export const logger = createLogger();

type TableRow = [string, string];

export function asTable(data: TableRow[]): string {
  if (data.length === 0) return "";
  const maxValueLength = 90;
  const maxPropLength = Math.max(...data.map(([prop]) => prop.length));
  let str = "";
  let longestLineLength = 0;
  for (let i = 0; i < data.length; i++) {
    const isOverflowing = data[i][1].length > maxValueLength;
    const propValue = isOverflowing
      ? data[i][1].slice(0, maxValueLength)
      : data[i][1];
    str += `${data[i][0].padEnd(maxPropLength, " ")} | ${propValue}${
      isOverflowing ? "..." : ""
    }\n`;
    const lineLength =
      maxPropLength +
      3 +
      (isOverflowing ? maxValueLength + 3 : propValue.length);
    if (lineLength > longestLineLength) {
      longestLineLength = lineLength;
    }
  }
  const divider = "-".repeat(longestLineLength);
  str = `${divider}\n${str}${divider}`;
  return str;
}

interface LokiLogEntry {
  streams: {
    stream: {
      [key: string]: string;
    };
    values: [string, string][];
  }[];
}

interface LoggerConfig {
  lokiUrl: string;
  lokiUsername: string;
  lokiPassword: string;
  labels: { [key: string]: string };
  batchSize: number;
  flushInterval: number;
}

interface Logger {
  info: (message: any) => void;
  error: (message: any) => void;
  flush: () => Promise<void>;
}

interface LogBatch {
  [key: string]: [string, string][];
}
