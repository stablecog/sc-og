export function base64ToSearchParams(base64: string): URLSearchParams {
  const base64String = base64.replace(/-/g, "+").replace(/_/g, "/");
  const decodedString = Buffer.from(base64String, "base64").toString("utf-8");
  return new URLSearchParams(decodedString);
}
