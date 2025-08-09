"use client";

import { useEffect, useState } from "react";
import StreamList from "./components/TwitchList";
import { fetchChannels, fetchStreams } from "../utils/apiUtils";
import { Box, LinearProgress } from "@mui/material";
import MainAppBar from "./components/MainAppBar";
import StreamSearchBar from "./components/StreamSearchBar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [twitchData, setTwitchData] = useState({ isStream: true, list: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  const errorHandler = (error) => {
    setIsLoading(false);
    alert(`エラーが発生しました: ${error}`);
  };

  useEffect(() => {
    setIsLoading(false);
    console.log("Loading finished");
  }, [twitchData]);

  useEffect(() => {
    if (isLoading) return;

    setIsLoading(true);
    console.log("Loading started");
    const query = new URLSearchParams({});
    fetchStreams(query, setTwitchData, errorHandler);

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
    const query = new URLSearchParams({ query: searchQuery });
    fetchChannels(query, setTwitchData, errorHandler);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {isLoading && (
        <LinearProgress
          color="secondary"
          sx={{
            position: "absolute",
            zIndex: 10,
            top: 0,
            width: "100%",
            height: "4px",
          }}
        />
      )}

      <Box sx={{ zIndex: 1 }}>
        <MainAppBar sx={{ backgroundColor: "primary.main" }} />

        <StreamSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSticky={isSticky}
          handleSearch={handleSearch}
        />
        {isSticky && <Box sx={{ height: "88px" }} />}

        <StreamList
          isStream={twitchData.isStream}
          list={twitchData.list}
          sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
        />
      </Box>
    </Box>
  );
}
