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

export default function ChannelsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const channelsContainer = useSelector(
    (state: RootState) => state.channels.value
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState(
    channelsContainer.query || "chat"
  );
  const [isSticky, setIsSticky] = useState(false);

  const errorHandler = (error: any) => {
    setIsLoading(false);
    alert(`エラーが発生しました: ${error}`);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (isLoading || !searchQuery) return;

    setIsLoading(true);
    console.log("Loading started");
    console.log("Search:", searchQuery);
    const queryParams = new URLSearchParams({ query: searchQuery });
    fetchChannels(
      queryParams,
      (payload) => {
        dispatch(setChannels(payload));
        scrollTo({ left: 0, top: 0, behavior: "auto" });
        setIsLoading(false);
      },
      errorHandler
    );
  };

  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    if (isLoading) return;
    const cursor = channelsContainer.pagination?.cursor;
    if (!cursor) return;
    const query = channelsContainer.query;
    if (!query) return;

    setIsLoading(true);
    console.log("Loading started");

    const queryParams = new URLSearchParams({ query: query, after: cursor });
    console.log("Search:", searchQuery);
    fetchChannels(
      queryParams,
      (payload) => {
        dispatch(setChannels(payload));
        setIsLoading(false);
      },
      errorHandler
    );
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
  });

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
          handleSearch={handleSearch}
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
          channels={channelsContainer.channels}
          sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
        />

        <div ref={sentinelRef} />
      </Box>
    </Box>
  );
}
