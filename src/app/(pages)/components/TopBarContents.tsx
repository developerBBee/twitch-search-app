import { Box } from "@mui/material";
import React from "react";
import ContentsTypes from "../../data/ContentsTypes";

const TopBarContents = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "8px 16px",
      }}
    >
      {ContentsTypes.map((type) => {
        return <Box key={type.key}>{type.label}</Box>;
      })}
    </Box>
  );
};

export default TopBarContents;
