import type { Metadata } from "next";
import "@/css/globals.css";

export const metadata: Metadata = {
  title: "sc-og",
  description: "sc-og",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
