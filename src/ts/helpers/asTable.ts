type TableRow = [string, string];

export function asTable(data: TableRow[], width: number = 100): string {
  if (data.length === 0) return "";

  const maxPropLength = Math.max(...data.map(([prop]) => prop.length));
  const maxValueLength = Math.max(1, width - maxPropLength - 3); // Ensure positive value
  let result = "";

  const divider = "-".repeat(width);
  result += divider + "\n";

  for (const [prop, value] of data) {
    const wrappedValue = wrapText(value, maxValueLength);
    const wrappedLines = wrappedValue.split("\n");

    for (let i = 0; i < wrappedLines.length; i++) {
      const line = wrappedLines[i];
      const propText =
        i === 0 ? prop.padEnd(maxPropLength, " ") : " ".repeat(maxPropLength);
      const lineStr = `${propText} | ${line.padEnd(maxValueLength, " ")}`;
      result += lineStr + "\n";
    }
  }

  result += divider;
  return result;
}

function wrapText(text: string, maxLength: number): string {
  const lines: string[] = [];
  let currentLine = "";

  for (const char of text) {
    if (currentLine.length >= maxLength) {
      lines.push(currentLine);
      currentLine = "";
    }

    if (char === " " && currentLine.length === 0) {
      continue; // Skip leading spaces
    }

    currentLine += char;

    if (char === "\n") {
      lines.push(currentLine);
      currentLine = "";
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.join("\n");
}
