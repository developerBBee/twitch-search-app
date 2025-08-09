import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";

const StreamSearchBar = ({
  searchQuery,
  setSearchQuery,
  isSticky,
  handleSearch,
}) => {
  return (
    <Box
      sx={{
        position: isSticky ? "fixed" : "static",
        top: isSticky ? 0 : "auto",
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "background.paper",
        boxShadow: isSticky ? 2 : 0,
        padding: 2,
        transition: "all 0.3s ease-in-out",
      }}
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
