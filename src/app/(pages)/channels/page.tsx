"use client";

import { useEffect, useRef, useState } from "react";
import { fetchChannels } from "../../utils/apiUtils";
import { Box, LinearProgress } from "@mui/material";
import StreamSearchBar from "../components/StreamSearchBar";
import ChannelList from "./components/ChannelList";
import { useDispatch, useSelector } from "react-redux";
import { setChannels } from "../../../lib/features/channelsSlice";
import { RootState, AppDispatch } from "../../../lib/store";
import React from "react";
import { TwitchChannel } from "../../../types";

export default function ChannelsPage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const channelsContainer = useSelector(
    (state: RootState) => state.channels.value
  );

  const liveOnly = channelsContainer.liveOnly;
  console.log("liveOnly: ", liveOnly);
  const cursor = channelsContainer.pagination?.cursor;
  const langCodes = channelsContainer.languages.map((lang) => lang.code);
  const langFilter = (channel: TwitchChannel) =>
    langCodes.length == 0 || langCodes.includes(channel.broadcaster_language);
  const channels = channelsContainer.channels
    .filter((c) => (liveOnly ? c.is_live : true))
    .filter(langFilter);
  const isTerminal = channelsContainer.isTerminal;

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(channelsContainer.query);
  const [isSticky, setIsSticky] = useState(false);

  const fetchChannelsWithParams = () => {
    const query = new URLSearchParams({
      query: searchQuery,
      live_only: `${liveOnly}`,
    });
    if (cursor) query.set("after", cursor);
    langCodes.forEach((code) => query.append("broadcaster_language", code));
    setIsLoading(true);
    console.log("Loading started query: ", query.toString());
    fetchChannels(query, onFetchChannelsSuccess, errorHandler);
  };

  const onFetchChannelsSuccess = (payload: any) => {
    dispatch(setChannels(payload));
    setIsLoading(false);
  };

  const errorHandler = (error: any) => {
    setIsLoading(false);
    alert(`エラーが発生しました: ${error}`);
  };

  useEffect(() => {
    console.log("Initial load");
    fetchChannelsWithParams();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    if (isLoading || isTerminal) return;
    console.log("Loading more...");
    fetchChannelsWithParams();
  };

  useEffect(() => {
    const el = sentinelRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { root: null, rootMargin: "400px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [channels]);

  return (
    <Box sx={{ position: "relative" }}>
      {isLoading && (
        <LinearProgress
          color="secondary"
          sx={{
            position: "fixed",
            zIndex: 200,
            top: 0,
            width: "100%",
            height: "4px",
          }}
        />
      )}

      <Box>
        <StreamSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={fetchChannelsWithParams}
          sx={{
            position: isSticky ? "fixed" : "static",
            top: isSticky ? 0 : "auto",
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: "background.paper",
            boxShadow: isSticky ? 2 : 0,
            padding: 2,
            transition: "all 0.3s ease-in-out",
          }}
        />
        {isSticky && <Box sx={{ height: "88px" }} />}

        <ChannelList
          channels={channels}
          sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
        />

        <div ref={sentinelRef} />
      </Box>
    </Box>
  );
}
