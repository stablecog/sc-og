import { asTable, logger } from "@/ts/constants/logger";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { method, url, headers } = request;
  const userAgent = headers.get("user-agent") || "Unknown";
  const urlObject = new URL(url);
  const relativeUrl = urlObject.pathname + urlObject.search;
  if (!userAgent.startsWith("kube-probe")) {
    logger.info(
      asTable([
        ["Request Method", method],
        ["Relative URL", relativeUrl],
        ["User Agent", userAgent],
      ])
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
