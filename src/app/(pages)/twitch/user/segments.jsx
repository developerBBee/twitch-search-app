import {
  Box,
  Card,
  List,
  Typography,
  Chip,
  Divider,
  ListItem,
} from "@mui/material";
import { AccessTime, Event } from "@mui/icons-material";
import React from "react";

const Segments = ({ segments }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{ marginBottom: 3, fontWeight: "bold" }}
      >
        スケジュール
      </Typography>
      <List sx={{ padding: 0 }}>
        {segments.map((segment, index) => (
          <ListItem key={segment.id} sx={{ padding: 0, marginBottom: 2 }}>
            <Segment segment={segment} isLast={index === segments.length - 1} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const Segment = ({ segment, isLast }) => {
  // TZ付き日時文字列をローカル日時文字列に変換する関数
  const formatLocalDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString(navigator.language, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

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

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 2,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
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
          {segment.title}
        </Typography>

        {/* カテゴリがある場合 */}
        {segment.category && (
          <Chip
            label={segment.category}
            size="small"
            color="secondary"
            sx={{ marginBottom: 2 }}
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
          <Event color="action" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {formatDate(segment.start_time)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTime color="action" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {formatTime(segment.start_time)} 〜 {formatTime(segment.end_time)}
          </Typography>
        </Box>
      </Box>

      {!isLast && <Divider />}
    </Card>
  );
};

export default Segments;
