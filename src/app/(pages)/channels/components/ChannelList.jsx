import { Box, Grid } from "@mui/material";
import React from "react";
import ChannelCard from "./ChannelCard";

function ChannelList({ channels, sx }) {
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
        {channels.map((channel) => (
          <Grid key={channel.id} item xs={12} sm={6} md={4}>
            <ChannelCard channel={channel} sx={cardSx} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ChannelList;
