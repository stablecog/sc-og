import { NextRequest, NextResponse } from "next/server";
import cors from "../../../lib/ts/constants/cors";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  try {
    return cors(req, new Response("Everything is fine", { status: 200 }));
  } catch (error) {
    return cors(req, new Response("No body", { status: 500 }));
  }
}
