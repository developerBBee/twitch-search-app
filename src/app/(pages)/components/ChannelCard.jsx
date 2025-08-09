"use client";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { Mic, Person } from "@mui/icons-material";
import IconText from "./IconText";
import { formatNumber } from "@/app/utils/formatter";
import LiveMark from "./LiveMark";

const ChannelCard = ({ channel, sx }) => {
  const [error, setError] = useState(false);
  const resizedThumbnailUrl = channel.thumbnail_url
    .replace("{width}", 320)
    .replace("{height}", 180);
  const imageSrc = error ? "images/no_image.png" : resizedThumbnailUrl;

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
          title={channel.title}
          sx={{ maxWidth: 280, mb: 1 }}
        >
          {channel.title}
        </Typography>

        <IconText
          text={channel.user_name}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          <Mic fontSize="small" />
        </IconText>

        <IconText
          text={formatNumber(channel.viewer_count)}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          <Person fontSize="small" />
        </IconText>
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
