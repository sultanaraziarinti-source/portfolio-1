import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sultana Razia Sharmin — Portfolio",
  description: "Android Developer | JavaScript | UI/UX | Python | Data Science | Google Analytics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-M9L670TD96" strategy="beforeInteractive" />
        <Script id="ga-init" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-M9L670TD96');
        `}</Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
