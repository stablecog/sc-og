import { NextResponse } from "next/server";

//
export async function GET(req: Request) {
  return new NextResponse("ok", { status: 200 });
}
