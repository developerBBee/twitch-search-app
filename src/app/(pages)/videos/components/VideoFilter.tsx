import { Checkbox, SxProps, Typography } from '@mui/material';
import { Box, Theme } from '@mui/system';
import React from 'react'
import LanguageDropdown from '../../components/LanguageDropdown';
import LanguageList from '../../../data/LanguageList';

interface StreamFilterProps {
  sx?: SxProps<Theme>;
}

const VideoFilter: React.FC<StreamFilterProps> = ({ sx }) => {
  return (
    <Box sx={sx}>
      <Typography variant="h6">検索条件</Typography>

      <Box sx={{ m: 2, display: "flex", alignItems: "center" }}>
        <Checkbox checked={false} value="配信中のみ" />
        <Typography variant="body2">配信中のみ</Typography>
      </Box>

      <Box sx={{ m: 2 }}>
        <LanguageDropdown languages={LanguageList} />
      </Box>

      <Box sx={{ m: 2 }}>
        <Typography variant="body1">言語</Typography>
        {LanguageList.map((lang) => (
          <Box key={lang.key} sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox key={lang.key} value={lang.key} />
            <Typography variant="body2">{lang.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default VideoFilter