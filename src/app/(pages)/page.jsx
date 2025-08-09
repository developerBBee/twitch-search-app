"use client";

import { useEffect, useState } from "react";
import StreamList from "./components/StreamList";
import { fetchChannels, fetchStreams } from "../utils/apiUtils";
import { Box } from "@mui/material";
import MainAppBar from "./components/MainAppBar";
import StreamSearchBar from "./components/StreamSearchBar";

export default function Home() {
  const [streamList, setStreamList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams({});
    fetchStreams(query, setStreamList, (error) => {
      alert(`配信情報の取得に失敗しました。${error}`);
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    console.log("Search:", searchQuery);
    const query = new URLSearchParams({query: searchQuery});
    fetchChannels(query, setStreamList, (error) => {
      alert(`チャンネル情報の取得に失敗しました。${error}`);
    });
  };

  return (
    <Box>
      <MainAppBar sx={{ backgroundColor: "primary.main" }} />
      <StreamSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSticky={isSticky}
        handleSearch={handleSearch}
      />
      {isSticky && <Box sx={{ height: "88px" }} />}
      <StreamList
        streamList={streamList}
        sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
      />
    </Box>
  );
}
