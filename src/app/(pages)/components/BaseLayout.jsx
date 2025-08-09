"use client";

import React from "react";
import { darkTheme } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

const BaseLayout = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default BaseLayout;
