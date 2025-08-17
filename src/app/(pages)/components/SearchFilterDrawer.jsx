import { Drawer } from "@mui/material";
import React from "react";
import SearchFilterContents from "./SearchFilterContents";

const SearchFilterDrawer = ({ open }) => {
  const drawerWidth = open ? 250 : 50;
  return (
    <Drawer
      anchor="left"
      open={true}
      sx={{ width: drawerWidth }}
    >
      {true && <SearchFilterContents />}
    </Drawer>
  );
};

export default SearchFilterDrawer;
