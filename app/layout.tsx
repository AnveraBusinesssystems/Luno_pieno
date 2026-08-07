import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "LUNO PIENO — Made for a Life in Motion";
  const description = "Swiss-made essentials with a Mediterranean state of mind.";

  return {
    title,
    description,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#111513" },
      { media: "(prefers-color-scheme: dark)", color: "#07111c" },
    ],
    openGraph: {
      title,
      description,
      siteName: "LUNO PIENO",
      url: origin,
      type: "website",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1774,
          height: 887,
          alt: "LUNO PIENO — Made for a life in motion.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/luno-theme.css?v=day-night-01" />
        <script src="/luno-theme.js" />
      </head>
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
