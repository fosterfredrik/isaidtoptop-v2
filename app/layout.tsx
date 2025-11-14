import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import "./globals.css";

const geomanist = localFont({
  src: [
    {
      path: './fonts/Geomanist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Geomanist-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Geomanist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Geomanist-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-geomanist',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "I Said Top Top",
  description: "Transparent product research with verified specs and no BS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={[geomanist.className, "antialiased"].join(" ")}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}