"use client";

import { useEffect, useRef, useState } from "react";
import { fetchStreams } from "../../utils/apiUtils";
import { Box, LinearProgress } from "@mui/material";
import StreamSearchBar from "../components/StreamSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setStreams } from "../../../lib/features/streamsSlice";
import { AppDispatch, RootState } from "../../../lib/store";
import StreamList from "./components/StreamList";
import { TwitchStream } from "../../../types";

export default function StreamsPage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const streamsContainer = useSelector(
    (state: RootState) => state.streams.value
  );

  const cursor = streamsContainer.pagination?.cursor;
  const langCodes = streamsContainer.languages.map((lang) => lang.code);
  const langFilter = (stream: TwitchStream) =>
    langCodes.length == 0 || langCodes.includes(stream.language);
  const streams = streamsContainer.streams.filter(langFilter);
  const isTerminal = streamsContainer.isTerminal;

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  const fetchStreamsWithParams = () => {
    const query = new URLSearchParams({});
    if (cursor) query.set("after", cursor);
    langCodes.forEach((code) => query.append("language", code));
    // TODO searchQuery
    setIsLoading(true);
    fetchStreams(query, onFetchStreamsSuccess, errorHandler);
  };

  const onFetchStreamsSuccess = (payload: any) => {
    dispatch(setStreams(payload));
    setIsLoading(false);
  };

  const errorHandler = (error: any) => {
    setIsLoading(false);
    console.log("Loading finished");
    alert(`エラーが発生しました: ${error}`);
  };

  useEffect(() => {
    console.log("Loading started");
    fetchStreamsWithParams();

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
    fetchStreamsWithParams();
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
  }, [streams]);

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
          handleSearch={() => {}} // TODO
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

        <StreamList
          streams={streams}
          sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
        />

        <div ref={sentinelRef} />
      </Box>
    </Box>
  );
}
