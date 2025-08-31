"use client";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { Mic, RemoveRedEye } from "@mui/icons-material";
import { VideoCardProps } from "../../../../types";
import LiveMark from "../../components/LiveMark";
import IconText from "../../components/IconText";
import { formatNumber } from "../../../utils/formatter";

const VideoCard: React.FC<VideoCardProps> = ({ video, sx }) => {
  const [error, setError] = useState<boolean>(false);
  const resizedThumbnailUrl = video.thumbnail_url
    .replace("%{width}", "320")
    .replace("%{height}", "180");
  const imageSrc = error ? "images/no_image.png" : resizedThumbnailUrl;

  const handleCardClick = () => {
    console.log("Card clicked:", video.user_login);
    if (!video.user_login) return;
    const url = `https://www.twitch.tv/${video.user_login}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card onClick={handleCardClick} sx={sx}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={imageSrc}
          onError={() => setError(true)}
          alt={video.title}
          sx={{
            width: 320,
            height: 180,
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          noWrap
          title={video.title}
          sx={{ maxWidth: 280, mb: 1 }}
        >
          {video.title}
        </Typography>

        <IconText
          text={video.user_name}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          <Mic fontSize="small" />
        </IconText>

        <IconText
          text={formatNumber(video.view_count)}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          <RemoveRedEye fontSize="small" />
        </IconText>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
