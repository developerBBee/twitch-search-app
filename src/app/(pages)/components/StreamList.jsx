import { Box, Grid } from "@mui/material";
import React from "react";
import StreamCard from "./StreamCard";

function StreamList({ streams, sx }) {
  const cardSx = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 4,
      cursor: "pointer",
    },
  };

  return (
    <Box sx={sx}>
      <Grid container spacing={3}>
        {streams.map((stream) =>
          <Grid key={stream.id} item xs={12} sm={6} md={4}>
            <StreamCard stream={stream} sx={cardSx} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default StreamList;
