import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TwitchApiResponse, TwitchVideo, VideosState } from "../../types";

const initialState: { value: VideosState } = {
  value: { videos: [], pagination: { cursor: "" } },
};

export const videosSlice = createSlice({
  name: "videos",
  initialState: initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<TwitchApiResponse<TwitchVideo>>) => {
      const newVideos = action.payload?.data || [];
      const prevIds = new Set(state.value.videos.map((s) => s.id));

      const filteredVideos = newVideos.filter((s) => !prevIds.has(s.id));
      state.value.videos.push(...filteredVideos);

      const newPagination = action.payload?.pagination;
      if (newPagination) {
        state.value.pagination = newPagination;
      }
    },
  },
});

export const { setVideos } = videosSlice.actions;
export default videosSlice.reducer;
