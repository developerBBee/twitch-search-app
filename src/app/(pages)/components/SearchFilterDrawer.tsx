import { Drawer } from "@mui/material";
import React from "react";
import SearchFilterContents from "./SearchFilterContents";

interface SearchFilterDrawerProps {
  open: boolean;
}

const SearchFilterDrawer: React.FC<SearchFilterDrawerProps> = ({ open }) => {
  const drawerWidth = open ? 250 : 50;
  return (
    <Drawer
      anchor="left"
      open={true}
      sx={{ width: drawerWidth }}
    >
      {true && <SearchFilterContents sx={{}} />}
    </Drawer>
  );
};

export default SearchFilterDrawer;
