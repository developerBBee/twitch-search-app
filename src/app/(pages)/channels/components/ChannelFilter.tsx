import { Box, Checkbox, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import LanguageDropdown from "../../components/LanguageDropdown";
import LanguageList from "../../../data/LanguageList";

interface ChannelFilterProps {
  sx?: SxProps<Theme>;
  liveOnly: boolean;
  onLiveOnlyChange: (checked: boolean) => void;
  langs?: string[];
  onLangCheck?: (lang: string, checked: boolean) => void;
}

const ChannelFilter: React.FC<ChannelFilterProps> = ({
  sx,
  liveOnly,
  onLiveOnlyChange,
  langs,
  onLangCheck,
}) => {
  return (
    <Box sx={sx}>
      <Typography variant="h6">検索条件</Typography>

      <Box sx={{ m: 2, display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={liveOnly}
          onChange={(_, checked) => onLiveOnlyChange(checked)}
          value="配信中のみ"
        />
        <Typography variant="body2">配信中のみ</Typography>
      </Box>

      <Box sx={{ m: 2 }}>
        <LanguageDropdown languages={LanguageList} />
      </Box>

      <Box sx={{ m: 2 }}>
        <Typography variant="body1">言語</Typography>
        {LanguageList.map((lang) => (
          <Box key={lang.key} sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              key={lang.key}
              value={lang.key}
              checked={langs.includes(lang.key)}
              onChange={(_, checked) => {
                onLangCheck(lang.key, checked);
              }}
            />
            <Typography variant="body2">{lang.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChannelFilter;
