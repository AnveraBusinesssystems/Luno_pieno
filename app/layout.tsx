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
  const title = "LUNO PIENO — Swiss Essentials";
  const description = "Unisex essentials shaped by Swiss precision and the ease of the Mediterranean.";

  return {
    title,
    description,
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
          alt: "LUNO PIENO — The art of living, considered.",
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
    <html lang="en">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
