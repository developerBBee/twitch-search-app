import { Box } from "@mui/material";
import React from "react";

const TwitchLayout = ({ children }) => {
  return (
    <Box sx={{ padding: "8px 32px" }}>{children}</Box>
  );
};

export default TwitchLayout;
