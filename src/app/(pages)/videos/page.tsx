"use client";

import { Box, LinearProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import StreamSearchBar from "../components/StreamSearchBar";
import VideoList from "./components/VideoList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store";
import { setVideos } from "../../../lib/features/videosSlice";
import { fetchVideos } from "../../utils/apiUtils";

export default function VideosPage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const videosContainer = useSelector((state: RootState) => state.videos.value);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadVideos = async () => {
    const queryParams = new URLSearchParams({ game_id: "33214" });
    fetchVideos(
      queryParams,
      (payload) => {
        dispatch(setVideos(payload));
        setIsLoading(false);
      },
      errorHandler
    );
  };

  const errorHandler = (error: any) => {
    setIsLoading(false);
    alert(`エラーが発生しました: ${error}`);
  };

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

        <VideoList
          videos={videosContainer.videos}
          sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
        />

        <div ref={sentinelRef} />
      </Box>
    </Box>
  );
}
