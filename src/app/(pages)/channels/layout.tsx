"use client";

import { Box } from "@mui/material";
import React from "react";
import ChannelFilter from "./components/ChannelFilter";
import { AppDispatch, RootState } from "../../../lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setLanguages, setLiveOnly } from "../../../lib/features/channelsSlice";

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
  const onLangCheck = (lang: string, checked: boolean) => {
    let newLangs: string[];
    if (checked) {
      newLangs = [...langs, lang];
    } else {
      newLangs = langs.filter((l) => l !== lang);
    }
    dispatch(setLanguages(newLangs));
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
      <ChannelFilter
        sx={{ width: 250, p: 2 }}
        liveOnly={liveOnly}
        onLiveOnlyChange={onLiveOnlyChange}
        langs={langs}
        onLangCheck={onLangCheck}
      />
      {children}
    </Box>
  );
};

export default ChannelsLayout;
