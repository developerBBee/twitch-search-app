import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Language,
  StreamsState,
  TwitchApiResponse,
  TwitchStream,
} from "../../types";

const initialState: { value: StreamsState } = {
  value: {
    streams: [],
    pagination: { cursor: "" },
    languages: [],
    isTerminal: false,
  },
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
      const newPagination = action.payload?.pagination;

      const prevIds = new Set(state.value.streams.map((s) => s.id));
      const filteredStreams = newStreams.filter((s) => !prevIds.has(s.id));

      if (filteredStreams.length > 0) {
        state.value.streams = [...state.value.streams, ...filteredStreams];
      }
      if (newStreams.length > 0) {
        state.value.pagination = newPagination || { cursor: "" };
      } else {
        state.value.isTerminal = true;
      }
    },
    setLanguages: (state, action: PayloadAction<Language[]>) => {
      state.value.languages = action.payload;
      state.value.pagination = { cursor: "" };
      state.value.isTerminal = false;
    },
  },
});

export const { setStreams, setLanguages } = streamsSlice.actions;
export default streamsSlice.reducer;
