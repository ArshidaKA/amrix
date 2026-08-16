import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amrix — Intelligent Automation. Seamless Workflows.",
  description:
    "Amrix is an AI-powered systems studio building automation, workflow intelligence, and data-driven growth for ambitious brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050505] text-[#f4f4f2]">
        {children}
      </body>
    </html>
  );
}
