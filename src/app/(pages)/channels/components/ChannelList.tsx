import { Box } from "@mui/material";
import React from "react";
import ChannelCard from "./ChannelCard";
import { ChannelListProps } from "../../../../types";

const ChannelList: React.FC<ChannelListProps> = ({ channels, sx }) => {
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {channels.map((channel) => (
          <Box key={channel.id}>
            <ChannelCard channel={channel} sx={cardSx} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChannelList;
