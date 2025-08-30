import { Avatar, Box, Typography } from '@mui/material';
import React from 'react'
import { IconTextProps } from "../../../types";

const IconText: React.FC<IconTextProps> = ({ sx, text, children }) => {
  return (
    <Box sx={sx}>
      <Avatar sx={{ width: 24, height: 24 }}>{children}</Avatar>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}

export default IconText
