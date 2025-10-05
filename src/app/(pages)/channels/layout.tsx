"use client";

import { Box } from "@mui/material";
import React from "react";
import ChannelFilter from "./components/ChannelFilter";
import { AppDispatch, RootState } from "../../../lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setLanguages, setLiveOnly } from "../../../lib/features/channelsSlice";
import { Language } from "../../../types";

interface ChannelsLayoutProps {
  children: React.ReactNode;
}

const ChannelsLayout: React.FC<ChannelsLayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const channelsContainer = useSelector(
    (state: RootState) => state.channels.value
  );

  const liveOnly = channelsContainer.liveOnly;
  const onLiveOnlyChange = (checked: boolean) => {
    dispatch(setLiveOnly(checked));
  };

  const langs = channelsContainer.languages;

  const onSelectedLangsChange = (langs: Language[]) => {
    dispatch(setLanguages(langs));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
      <ChannelFilter
        sx={{ width: 250, p: 2 }}
        liveOnly={liveOnly}
        onLiveOnlyChange={onLiveOnlyChange}
        selectedLangs={langs}
        onSelectedLangsChange={onSelectedLangsChange}
      />
      {children}
    </Box>
  );
};

export default ChannelsLayout;
