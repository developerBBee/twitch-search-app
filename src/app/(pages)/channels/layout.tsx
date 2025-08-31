import { Box } from '@mui/material';
import React from 'react'
import ChannelFilter from './components/ChannelFilter';

interface ChannelsLayoutProps {
  children: React.ReactNode;
}

const ChannelsLayout: React.FC<ChannelsLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
      <ChannelFilter sx={{ width: 250, p: 2 }} />
      {children}
    </Box>
  );
}

export default ChannelsLayout;