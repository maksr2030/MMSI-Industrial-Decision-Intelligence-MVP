import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MMSI™ Industrial Decision Intelligence MVP",
  description: "Operational MVP for pre-execution industrial decision intelligence.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
