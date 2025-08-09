import { SettingsInputAntenna } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react'

const LiveMark = () => {
  return (
    <Avatar
      sx={{
        position: "absolute",
        top: 8,
        left: 8,
        color: "red",
        background: "rgba(64, 0, 0, 0.6)",
      }}
    >
      <SettingsInputAntenna fontSize="medium" />
    </Avatar>
  );
}

export default LiveMark