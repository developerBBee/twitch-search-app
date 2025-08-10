"use client";

import React from "react";
import { darkTheme } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import StoreProvider from "../StoreProvider";

const BaseLayout = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );
};

export default BaseLayout;
