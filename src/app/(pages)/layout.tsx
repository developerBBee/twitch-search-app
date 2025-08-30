import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import BaseLayout from "./components/BaseLayout";
import { Box } from "@mui/material";
import MainAppBar from "./components/MainAppBar";
import { Metadata } from "next";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twitch配信検索",
  description: "Twitchライブ配信やビデオを検索するためのアプリケーションです。",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BaseLayout>
          <Box>
            <MainAppBar sx={{ backgroundColor: "primary.main" }} />
            <Box sx={{ paddingTop: "64px" }}>{children}</Box>
          </Box>
        </BaseLayout>
      </body>
      <GoogleAnalytics gaId="G-2EF27B4G2S" />
    </html>
  );
}
