"use client";

import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function WebSocketDemo({ url = "wss://eventsub.wss.twitch.tv/ws" }) {
  const wsRef = useRef(null);
  const [isConnected, setConnected] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    if (!url) {
      console.error(`WebSocket URL is not provided ${url}`);
      return;
    }

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onmessage = (e) => {
      let data = e.data;
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }

      console.log("WebSocket message received:", data);
      setMessage(data.metadata.message_id);
    };
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => setConnected(false);

    return () => {
      console.log("Closing WebSocket connection");
      ws.close(1000, "Closing connection");
      wsRef.current = null;
    };
  }, [url]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        WebSocket URL: {url}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        value={message}
      />
    </Box>
  );
};
