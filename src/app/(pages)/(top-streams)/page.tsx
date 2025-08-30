"use client";

import { useEffect, useRef, useState } from "react";
import { fetchChannels, fetchStreams } from "../../utils/apiUtils";
import { Box, LinearProgress } from "@mui/material";
import StreamSearchBar from "../components/StreamSearchBar";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setStreams } from "../../../lib/features/streamsSlice";
import { setChannels } from "../../../lib/features/channelsSlice";
import { AppDispatch, RootState } from "../../../lib/store";
import StreamList from "./components/StreamList";

export default function TopStreams(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const streamsContainer = useSelector((state: RootState) => state.streams.value);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSticky, setIsSticky] = useState<boolean>(false);

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
    setIsLoading(false);
    console.log("Loading finished");
  }, [streamsContainer.streams]);

  useEffect(() => {
    if (isLoading) return;

    setIsLoading(true);
    console.log("Loading started");
    const query = new URLSearchParams({});
    fetchStreams(query, onFetchStreamsSuccess, errorHandler);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSearchSuccess = (payload: any) => {
    dispatch(setChannels(payload));
    setIsLoading(false);
    console.log("Loading finished");
    router.push("/channels");
  };

  const handleSearch = () => {
    if (isLoading || !searchQuery) return;

    setIsLoading(true);
    console.log("Loading started");
    console.log("Search:", searchQuery);
    const query = new URLSearchParams({ query: searchQuery });
    fetchChannels(query, onSearchSuccess, errorHandler);
  };

  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    if (isLoading) return;
    const cursor = streamsContainer.pagination?.cursor;
    if (!cursor) return;

    setIsLoading(true);
    console.log("Loading started");

    const queryParams = new URLSearchParams({ after: cursor });
    console.log("Search:", searchQuery);
    fetchStreams(
      queryParams,
      (payload: any) => dispatch(setStreams(payload)),
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

        <StreamList
          streams={streamsContainer.streams}
          sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
        />

        <div ref={sentinelRef} />
      </Box>
    </Box>
  );
}
