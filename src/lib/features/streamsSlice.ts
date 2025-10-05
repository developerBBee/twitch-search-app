import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, StreamsState, TwitchApiResponse, TwitchStream } from "../../types";

const initialState: { value: StreamsState } = {
  value: { streams: [], pagination: { cursor: "" }, languages: [] },
};

export const streamsSlice = createSlice({
  name: "streams",
  initialState: initialState,
  reducers: {
    setStreams: (
      state,
      action: PayloadAction<TwitchApiResponse<TwitchStream>>
    ) => {
      const newStreams = action.payload?.data || [];
      const prevIds = new Set(state.value.streams.map((s) => s.id));

      const filteredStreams = newStreams.filter((s) => !prevIds.has(s.id));
      state.value.streams.push(...filteredStreams);

      const newPagination = action.payload?.pagination;
      if (newPagination) {
        state.value.pagination = newPagination;
      }
    },
    setLanguages: (state, action: PayloadAction<Language[]>) => {
      state.value.languages = action.payload;
    },
  },
});

export const { setStreams, setLanguages } = streamsSlice.actions;
export default streamsSlice.reducer;
