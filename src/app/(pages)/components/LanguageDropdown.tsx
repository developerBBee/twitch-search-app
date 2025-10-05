"use client";

import {
  Box,
  Checkbox,
  Chip,
  ClickAwayListener,
  FormControl,
  ListItemText,
  MenuItem,
  Paper,
  Popper,
  TextField,
} from "@mui/material";
import { Language } from "../../../types";
import { Close } from "@mui/icons-material";
import React, { useRef, useState } from "react";

type LanguageProps = {
  languages: Language[];
  selectedLangs: Language[];
  onSelectedLangsChange: (langs: Language[]) => void;
};

const LanguageDropdown: React.FC<LanguageProps> = (props) => {
  const { languages, selectedLangs, onSelectedLangsChange } = props;

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement>(null);

  const handleChange = (lang: Language) => {
    if (selectedLangs.includes(lang)) {
      handleDelete(lang);
    } else {
      onSelectedLangsChange([...selectedLangs, lang]);
    }
  };

  const handleDelete = (lang: Language) => {
    onSelectedLangsChange(selectedLangs.filter((l) => l !== lang));
  };

  const filteredLanguages = languages.filter((lang) => {
    if (!search) return true;
    return lang.label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {/* 選択済み言語をフォーム枠外に表示 */}
      <Box sx={{ m: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
        {languages
          .filter((lang) => selectedLangs.includes(lang))
          .map((lang) => (
            <Chip
              key={lang.code}
              label={lang.label}
              onDelete={() => handleDelete(lang)}
              deleteIcon={<Close />}
              sx={{ fontSize: 14 }}
            />
          ))}
      </Box>

      {/* 検索バー */}
      <TextField
        label={open ? "" : "言語"}
        variant="outlined"
        size="small"
        value={search}
        onClick={() => setOpen(true)}
        onChange={(e) => setSearch(e.target.value)}
        inputRef={anchorRef}
        fullWidth
        sx={{ mb: 1 }}
        slotProps={{ inputLabel: { shrink: false } }}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        style={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            sx={{
              width: anchorRef.current?.offsetWidth || 240,
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            <FormControl fullWidth>
              {filteredLanguages.map((lang) => (
                <MenuItem
                  key={lang.code}
                  value={lang.code}
                  onClick={() => handleChange(lang)}
                >
                  <Checkbox checked={selectedLangs.includes(lang)} />
                  <ListItemText primary={lang.label} />
                </MenuItem>
              ))}
            </FormControl>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default LanguageDropdown;
