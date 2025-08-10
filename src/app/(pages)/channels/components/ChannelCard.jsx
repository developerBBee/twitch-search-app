"use client";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LiveMark from "../../components/LiveMark";

const ChannelCard = ({ channel, sx }) => {
  const [error, setError] = useState(false);
  const resizedThumbnailUrl = channel.thumbnail_url
    .replace("{width}", 320)
    .replace("{height}", 180);
  const imageSrc = error ? "/images/no_image.png" : resizedThumbnailUrl;
  const tags = Array.from(new Set(channel.tags ?? [])).slice(0, 3);

  const handleCardClick = () => {
    console.log("Card clicked:", channel.broadcaster_login);
    if (!channel.broadcaster_login) return;
    const url = `https://www.twitch.tv/${channel.broadcaster_login}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card onClick={handleCardClick} sx={sx}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={imageSrc}
          onError={() => setError(true)}
          alt={channel.display_name}
          sx={{
            width: 320,
            height: 180,
          }}
        />
        {channel.is_live && <LiveMark />}
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          noWrap
          title={channel.display_name}
          sx={{ maxWidth: 280, mb: 1 }}
        >
          {channel.display_name}
        </Typography>

        {tags.map((tag) => (
          <Chip
            key={`${channel.id}_${tag}`}
            label={tag}
            sx={{ maxWidth: 96, margin: "0px 1px 0px 1px" }}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
