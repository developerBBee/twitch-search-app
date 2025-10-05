import { Box, Checkbox, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import LanguageDropdown from "../../components/LanguageDropdown";
import LanguageList from "../../../data/LanguageList";
import { Language } from "../../../../types";

type ChannelFilterProps = {
  sx?: SxProps<Theme>;
  liveOnly: boolean;
  onLiveOnlyChange: (checked: boolean) => void;
  selectedLangs?: Language[];
  onSelectedLangsChange: (langs: Language[]) => void;
}

const ChannelFilter: React.FC<ChannelFilterProps> = (props) => {
  const {
    sx,
    liveOnly,
    onLiveOnlyChange,
    selectedLangs,
    onSelectedLangsChange,
  } = props;

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
        <LanguageDropdown
          languages={LanguageList}
          selectedLangs={selectedLangs}
          onSelectedLangsChange={onSelectedLangsChange}
        />
      </Box>
    </Box>
  );
};

export default ChannelFilter;
