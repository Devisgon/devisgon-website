import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import {
  DEFAULT_OPEN_GRAPH_IMAGE,
  MAIN_SITE_METADATA,
  SITE_NAME,
  SITE_URL,
  getOrganizationStructuredData,
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

export const metadata: Metadata = {
  ...MAIN_SITE_METADATA,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  generator: "Next.js",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  referrer: "origin-when-cross-origin",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/logo/logo.webp",
        type: "image/webp",
      },
    ],
    apple: [
      {
        url: "/logo/logo.webp",
        type: "image/webp",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    ...MAIN_SITE_METADATA.openGraph,
    title: MAIN_SITE_METADATA.title as string,
    description: MAIN_SITE_METADATA.description ?? "",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
  },
  twitter: {
    ...MAIN_SITE_METADATA.twitter,
    card: "summary_large_image",
    title: MAIN_SITE_METADATA.title as string,
    description: MAIN_SITE_METADATA.description ?? "",
    images: [DEFAULT_OPEN_GRAPH_IMAGE.url],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const websiteStructuredData = getWebsiteStructuredData();
const organizationStructuredData = getOrganizationStructuredData();
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
          id="organization-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
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
