import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";

const StreamSearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  sx,
}) => {
  return (
    <Box
      sx={sx}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="配信者名やゲーム名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          slotProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ minWidth: "120px", height: "56px" }}
        >
          検索
        </Button>
      </Box>
    </Box>
  );
};

export default StreamSearchBar;
