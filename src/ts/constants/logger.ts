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
}

interface Logger {
  info: (message: any) => void;
  error: (message: any) => void;
}

let lastTimestamp = 0;

const getMonotonicTimestamp = (): string => {
  const now = Date.now() * 1000000; // Convert to nanoseconds
  lastTimestamp = Math.max(now, lastTimestamp + 1);
  return lastTimestamp.toString();
};

const sendToLoki = async (
  config: LoggerConfig,
  level: string,
  message: string
) => {
  if (!config.lokiUrl) return;

  const timestamp = getMonotonicTimestamp();
  const logEntry: LokiLogEntry = {
    streams: [
      {
        stream: { level, ...config.labels },
        values: [[timestamp, message]],
      },
    ],
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
      console.error(`Failed to send log to Loki: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error sending log to Loki:", error);
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
  };

  if (!config.lokiUrl) {
    console.warn("LOKI_URL is not set. Logs will only be output to console.");
  }

  const logAndSend = (level: "info" | "error", message: any) => {
    const logMessage =
      typeof message === "string" ? message : JSON.stringify(message);
    const consoleMethod = level === "info" ? console.log : console.error;
    consoleMethod(logMessage);
    sendToLoki(config, level, logMessage);
  };

  return {
    info: (message: any) => logAndSend("info", message),
    error: (message: any) => logAndSend("error", message),
  };
};

export const logger = createLogger();
