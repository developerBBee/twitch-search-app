import { AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import appIcon from "../icon.ico";

const MainAppBar = ({ sx }) => {
  return (
    <AppBar position="static" sx={sx}>
      <Toolbar>
        <Image
          width={40}
          height={40}
          src={appIcon}
          alt="アプリケーションアイコン"
        />
        <Typography
          variant="h6"
          component="h1"
          ml={1}
          sx={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Twitch配信検索
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
