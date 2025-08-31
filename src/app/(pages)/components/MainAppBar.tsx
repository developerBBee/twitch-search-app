"use client";

import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import appIcon from "../icon.ico";
import { useRouter } from "next/navigation";
import { SxProps, Theme } from "@mui/material/styles";

interface MainAppBarProps {
  sx?: SxProps<Theme>;
}

const MainAppBar: React.FC<MainAppBarProps> = ({ sx }) => {
  const theme = useTheme();
  const router = useRouter();

  const onTitleClick = () => {
    router.push("/");
  };

  const onChannelClick = () => {
    router.push("/channels");
  };

  const onStreamClick = () => {
    router.push("/streams");
  };

  const onVideoClick = () => {
    router.push("/videos");
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, ...sx }}>
      <Toolbar>
        <Box
          width="100%"
          sx={{
            pr: 1,
            display: "flex",
            direction: "row",
            alignItems: "center",
          }}
        >
          <Box
            onClick={onTitleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image
              width={40}
              height={40}
              src={appIcon}
              alt="メインアイコン"
              style={{
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            />
            <Typography
              width={150}
              variant="h6"
              component="h1"
              ml={1}
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Twitch配信検索
            </Typography>
          </Box>

          <Box
            sx={{
              maxWidth: 240,
              ml: 4,
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              onClick={onChannelClick}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              チャンネル
            </Typography>
            <Typography
              variant="body2"
              onClick={onStreamClick}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              ライブ
            </Typography>
            <Typography
              variant="body2"
              onClick={onVideoClick}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              ビデオ
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
