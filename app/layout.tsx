import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const mabryPro = localFont({
  src: [
    {
      path: "../public/fonts/MabryPro/MabryPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/MabryPro/MabryPro-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
});

const gtAlpina = localFont({
  src: [
    {
      path: "../public/fonts/GTAlpina/GTAlpina-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GTAlpina/GTAlpina-Light.woff",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "BEHVA Insurance Calculator",
  description: "Calculate your insurance premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script
          src="https://roguemark.piexels.co/injector.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${mabryPro.variable} ${gtAlpina.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
