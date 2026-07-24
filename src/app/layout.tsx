import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { SkipToContent } from "@/components/layout/SkipToContent";
import {
  AmbientBackground,
  CustomCursor,
  LoadingSplash,
  MotionProvider,
  ScrollProgress,
} from "@/components/motion";
import { buildRootMetadata } from "@/lib/seo";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body
        className={`${dmSans.className} relative flex min-h-full max-w-full flex-col overflow-x-clip bg-background text-text-primary`}
      >
        <MotionProvider>
          <LoadingSplash />
          <AmbientBackground />
          <ScrollProgress />
          <CustomCursor />
          <SkipToContent />
          <Header />
          <div className="relative z-0 flex min-h-full min-w-0 max-w-full flex-1 flex-col">
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
