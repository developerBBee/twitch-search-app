import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import BaseLayout from "./components/BaseLayout";
import { Box } from "@mui/material";
import MainAppBar from "./components/MainAppBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Twitch配信検索",
  description: "Twitchライブ配信やビデオを検索するためのアプリケーションです。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BaseLayout>
          <Box>
            <MainAppBar sx={{ backgroundColor: "primary.main" }} />
            {children}
          </Box>
        </BaseLayout>
      </body>
    </html>
  );
}
