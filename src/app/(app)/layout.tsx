import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  MAIN_SITE_METADATA,
  getSiteNavigationStructuredData,
  getWebsiteStructuredData,
} from "@/lib/seo";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = MAIN_SITE_METADATA;

const websiteStructuredData = getWebsiteStructuredData();
const navigationStructuredData = getSiteNavigationStructuredData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          id="navigation-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationStructuredData) }}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
