import { Box } from "@mui/material";
import React from "react";
import StreamCard from "./StreamCard";
import { StreamListProps } from "../../../../types";

const StreamList: React.FC<StreamListProps> = ({ streams, sx }) => {
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
        {streams.map((stream) => (
          <Box key={stream.id}>
            <StreamCard stream={stream} sx={cardSx} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StreamList;
