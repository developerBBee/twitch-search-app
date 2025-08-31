"use client";

import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import VideoFilter from "./components/VideoFilter";

interface StreamsLayoutProps {
  children: React.ReactNode;
}

const StreamsLayout: React.FC<StreamsLayoutProps> = ({ children }) => {
  const isWide = useMediaQuery("(min-width:600px)");

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
      <VideoFilter sx={{ width: 250, p: 2 }} />
      {children}
    </Box>
  );
};

export default StreamsLayout;
