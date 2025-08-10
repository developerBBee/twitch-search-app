import {
  Box,
  Card,
  List,
  Typography,
  Divider,
  ListItem,
} from "@mui/material";
import { Person, Upload } from "@mui/icons-material";
import React from "react";
import Image from "next/image";

const Videos = ({ videos }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{ marginBottom: 3, fontWeight: "bold" }}
      >
        動画
      </Typography>
      <List sx={{ padding: 0 }}>
        {videos.map((video, index) => (
          <ListItem key={video.id} sx={{ padding: 0, marginBottom: 2 }}>
            <Video video={video} isLast={index === videos.length - 1} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const Video = ({ video, isLast }) => {
  // 日付部分と時間部分を分離
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString(navigator.language);
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleCardClick = () => {
    if (video.url) {
      window.open(video.url, "_blank", "noopener,noreferrer");
    }
  }

  const resizedThumbnailUrl = video.thumbnail_url
    .replace('%{width}', 320)
    .replace('%{height}', 180);

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 2,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          cursor: video.url ? "pointer" : "default",
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box sx={{ padding: 3 }}>
        {/* タイトル */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            marginBottom: 2,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {video.title}
        </Typography>

        {/* サムネイルURLがある場合 */}
        {video.thumbnail_url && (
          <Image
            src={resizedThumbnailUrl}
            alt={video.title}
            width={320}
            height={180}
            layout="responsive"
            objectFit="cover"
            style={{ borderRadius: 8, marginBottom: 2 }}
          />
        )}

        {/* 日時情報 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginBottom: 1,
          }}
        >
          <Upload color="action" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {formatDate(video.created_at)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Person color="action" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {video.user_name}
          </Typography>
        </Box>
      </Box>

      {!isLast && <Divider />}
    </Card>
  );
};

export default Videos;
