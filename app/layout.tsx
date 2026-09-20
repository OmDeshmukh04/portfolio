import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Om Deshmukh — Software Engineer & Quant Developer in Progress",
  description: "Om Deshmukh's portfolio: systems projects, competitive programming, education, trekking photography, and a path toward quantitative development.",
  icons: {
    icon: "/favicon-trident.svg",
    shortcut: "/favicon-trident.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
