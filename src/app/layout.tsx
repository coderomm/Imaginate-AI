import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "./provider";
import { Toaster } from "@/components/ui/toaster";
import { Appbar } from "@/components/Appbar";
import Footer from "@/components/Footer";
import { baseMetadata, jsonLdSchema } from "@/lib/metadata";

export const metadata: Metadata = baseMetadata;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchema)
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Provider>
            <Appbar />
            {children}
            <Footer />
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
