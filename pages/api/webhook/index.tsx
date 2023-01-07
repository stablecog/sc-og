import { NextRequest } from "next/server";
import cors from "../../../lib/ts/constants/cors";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request body is:", body);
    return cors(req, new Response(JSON.stringify(body), { status: 200 }));
  } catch (error) {
    return cors(req, new Response("No body", { status: 500 }));
  }
}
