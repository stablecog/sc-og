import { logger } from "@/ts/constants/logger";
import { asTable } from "@/ts/helpers/asTable";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { method, url, headers } = request;
  const userAgent = headers.get("user-agent") || "Unknown";
  const urlObject = new URL(url);
  const relativeUrl = urlObject.pathname + urlObject.search;
  const referer = headers.get("referer") || "Unknown";
  if (!userAgent.startsWith("kube-probe")) {
    logger.info(
      asTable([
        ["Request Method", method],
        ["Relative URL", relativeUrl],
        ["User Agent", userAgent],
        ["Referer", referer],
      ])
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
