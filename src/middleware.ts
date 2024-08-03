import { asTable, logger } from "@/ts/constants/logger";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { method, url, headers } = request;
  const userAgent = headers.get("user-agent") || "Unknown";

  logger.info(
    asTable([
      ["Request Method", method],
      ["URL", url],
      ["User Agent", userAgent],
    ])
  );

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
