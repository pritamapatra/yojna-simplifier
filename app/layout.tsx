import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yojana Simplifier",
  description: "Understand Karnataka government schemes in simple language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
