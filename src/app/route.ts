import cors from "@/ts/constants/cors";

export async function GET(req: Request) {
  const response = Response.json({ status: "ok" });
  return cors(req, response);
}
