"use client";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { Mic, Person } from "@mui/icons-material";
import IconText from "./IconText";
import { formatNumber } from "@/app/utils/formatter";

const StreamCard = ({ stream, sx }) => {
  const [error, setError] = useState(false);
  const imageSrc = error ? "images/no_image.png" : stream.thumbnail_url;

  const handleCardClick = () => {
    console.log("Card clicked:", stream.user_id);
    if (!stream.user_id) return;
    const url = `https://www.twitch.tv/${stream.user_id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card onClick={handleCardClick} sx={sx}>
      <CardMedia
        component="img"
        image={imageSrc}
        onError={() => setError(true)}
        alt={stream.title}
        sx={{
          width: 320,
          height: 180,
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          noWrap
          title={stream.title}
          sx={{ maxWidth: 280, mb: 1 }}
        >
          {stream.title}
        </Typography>

        <IconText
          text={stream.streamer}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          <Mic fontSize="small" />
        </IconText>

        <IconText
          text={formatNumber(stream.viewer_count)}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          <Person fontSize="small" />
        </IconText>
      </CardContent>
    </Card>
  );
};

export default StreamCard;
