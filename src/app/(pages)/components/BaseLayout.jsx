"use client";

import React from "react";
import { darkTheme } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import StoreProvider from "../StoreProvider";
import NextAuthProvider from "../../../providers/NextAuth";

const BaseLayout = ({ children }) => {
  return (
    <NextAuthProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <StoreProvider>{children}</StoreProvider>
      </ThemeProvider>
    </NextAuthProvider>
  );
};

export default BaseLayout;
