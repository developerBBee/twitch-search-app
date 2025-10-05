"use client";

import { Box } from "@mui/material";
import React from "react";
import StreamFilter from "./components/StreamFilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store";
import { Language } from "../../../types";
import { setLanguages } from "../../../lib/features/streamsSlice";

interface StreamsLayoutProps {
  children: React.ReactNode;
}

const StreamsLayout: React.FC<StreamsLayoutProps> = ({ children }) => {
  // const isWide = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch<AppDispatch>();
  const streamsContainer = useSelector(
    (state: RootState) => state.streams.value
  );
  const langs = streamsContainer.languages;
  const onSelectedLangsChange = (langs: Language[]) => {
    dispatch(setLanguages(langs));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
      <StreamFilter
        sx={{ width: 250, p: 2 }}
        selectedLangs={langs}
        onSelectedLangsChange={onSelectedLangsChange}
      />
      {children}
    </Box>
  );
};

export default StreamsLayout;
