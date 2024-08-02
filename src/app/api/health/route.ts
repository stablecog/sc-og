import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  return new NextResponse("ok", { status: 200 });
}
