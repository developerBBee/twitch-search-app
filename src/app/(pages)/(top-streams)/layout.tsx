"use client";

import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import SearchFilterContents from "./components/SearchFilterContents";

interface LiveLayoutProps {
  children: React.ReactNode;
}

const LiveLayout: React.FC<LiveLayoutProps> = ({ children }) => {
  const isWide = useMediaQuery("(min-width:600px)");

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
      <SearchFilterContents sx={{ width: 250, p: 2 }} />
      {children}
    </Box>
  );
};

export default LiveLayout;
