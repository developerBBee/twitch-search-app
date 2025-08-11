"use client";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import appIcon from "../icon.ico";
import { useRouter } from "next/navigation";

const MainAppBar = ({ sx }) => {
  const router = useRouter();

  const onTitleClick = () => {
    router.push("/");
  };

  return (
    <AppBar position="static" sx={sx}>
      <Toolbar>
        <Box
          onClick={onTitleClick}
          sx={{
            pr: 1,
            display: "flex",
            direction: "row",
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
            sx={{
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          />
          <Typography
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
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
