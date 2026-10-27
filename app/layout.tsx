import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { siteUrl } from "./site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const title = "Om Deshmukh — Software Engineer & Quant Developer in Progress";
const description = "Om Deshmukh's portfolio: systems projects, competitive programming, education, trekking photography, and a path toward quantitative development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Om Deshmukh",
  authors: [{ name: "Om Deshmukh", url: siteUrl }],
  creator: "Om Deshmukh",
  keywords: ["Om Deshmukh", "software engineer", "quantitative developer", "C++", "limit order book", "Monte Carlo simulation", "competitive programming", "Pune"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Om Deshmukh",
    locale: "en_IN",
    url: "/",
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Om Deshmukh — software engineer, quantitative development in progress" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="portfolio-layout"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><div id="content">{children}</div><SiteFooter /></body>
    </html>
  );
}
