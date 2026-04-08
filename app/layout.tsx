// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LULU.WEB3",
  description: "Web3 Content Creator & Strategist Portfolio",

  openGraph: {
    title: "LULU.WEB3",
    description: "Web3 Content Creator & Strategist Portfolio",
    siteName: "LULU.WEB3",
    images: [
      {
        url: "/lulu.jpeg", // image inside /public
        width: 1200,
        height: 630,
        alt: "LULU.WEB3 Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LULU.WEB3",
    description: "Web3 Content Creator & Strategist Portfolio",
    images: ["/lulu.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}