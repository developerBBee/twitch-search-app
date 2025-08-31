import { Box } from "@mui/material";
import React from "react";
import { VideoListProps } from "../../../../types";
import VideoCard from "./VideoCard";

const VideoList: React.FC<VideoListProps> = ({ videos, sx }) => {
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

  console.log("Video List:", videos);

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
        {videos.map((video) => (
          <Box key={video.id}>
            <VideoCard video={video} sx={cardSx} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default VideoList;
