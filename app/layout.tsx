import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GNB Solutions",
  description: "Software tools built for real business problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900">{children}</body>
    </html>
  );
}
