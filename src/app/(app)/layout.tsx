import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import {
  MAIN_SITE_METADATA,
  getSiteNavigationStructuredData,
  getWebsiteStructuredData,
} from "@/lib/seo";
import NavigationProgress from "@/components/navigation_progress";
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
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <script
          id="temporary-local-theme"
          dangerouslySetInnerHTML={{
            __html: `
try {
  var themeKey = "theme";
  var sessionKey = "theme-session";
  var hasOpenSession = window.sessionStorage.getItem(sessionKey) === "active";

  if (!hasOpenSession) {
    window.localStorage.removeItem(themeKey);
    window.sessionStorage.setItem(sessionKey, "active");
  }

  window.sessionStorage.removeItem(themeKey);

  if (window.localStorage.getItem(themeKey) === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
} catch {}
`,
          }}
        />
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
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
}
