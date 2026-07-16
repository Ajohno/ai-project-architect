import type { Metadata } from "next";
import "./globals.css";
import "@/components/mascot/astronaut-mascot.css";

export const metadata: Metadata = {
  title: "AI Project Architect",
  description: "Turn rough software ideas into actionable product blueprints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
