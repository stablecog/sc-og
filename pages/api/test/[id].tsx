import { NextRequest, NextResponse } from "next/server";
import cors from "../../../lib/ts/constants/cors";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  try {
    const body = await req.json();
    const response = new NextResponse(JSON.stringify(body), {
      headers: { "Content-Type": "application/json" },
    });
    console.log(body);
    return cors(req, response);
  } catch (error) {
    return cors(req, new Response("No body", { status: 500 }));
  }
}
