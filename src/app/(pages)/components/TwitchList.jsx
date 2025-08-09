import { Box, Grid } from "@mui/material";
import React from "react";
import StreamCard from "./StreamCard";
import ChannelCard from "./ChannelCard";

function StreamList({ isStream, list, sx }) {
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

  const streamCards = () =>
    list.map((stream) => (
      <Grid key={stream.id} item xs={12} sm={6} md={4}>
        <StreamCard stream={stream} sx={cardSx} />
      </Grid>
    ));

  const channelCards = () =>
    list.map((channel) => (
      <Grid key={channel.id} item xs={12} sm={6} md={4}>
        <ChannelCard channel={channel} sx={cardSx} />
      </Grid>
    ));

  return (
    <Box sx={sx}>
      <Grid container spacing={3}>
        {isStream ? streamCards() : channelCards()}
      </Grid>
    </Box>
  );
}

export default StreamList;
