import { Box, Typography, SxProps, Theme } from "@mui/material";
import React from "react";
import LanguageList from "../../../data/LanguageList";
import LanguageDropdown from "../../components/LanguageDropdown";
import { Language } from "../../../../types";

interface StreamFilterProps {
  sx?: SxProps<Theme>;
  selectedLangs: Language[];
  onSelectedLangsChange: (langs: Language[]) => void;
}

const StreamFilter: React.FC<StreamFilterProps> = (props) => {
  const { sx, selectedLangs, onSelectedLangsChange } = props;
  return (
    <Box sx={sx}>
      <Typography variant="h6">検索条件</Typography>

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

export default StreamFilter;
