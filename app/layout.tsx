import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Om Deshmukh — Quantitative Developer",
  description: "Software engineer building quantitative finance and trading systems through C++, algorithms, and market microstructure research.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
