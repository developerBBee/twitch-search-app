"use client";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { darkTheme } from "../theme";

const TwitchLayout = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ padding: "8px 32px" }}>{children}</Box>
    </ThemeProvider>
  );
};

export default TwitchLayout;
