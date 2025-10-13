import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChannelsState,
  Language,
  TwitchApiResponse,
  TwitchChannel,
} from "../../types";

interface ChannelsPayload extends TwitchApiResponse<TwitchChannel> {
  query?: string;
}

const initialQuery = "chat";
const initialState: { value: ChannelsState } = {
  value: {
    channels: [],
    query: initialQuery,
    pagination: { cursor: "" },
    liveOnly: false,
    languages: [],
    isTerminal: false,
  },
};

export const channelsSlice = createSlice({
  name: "channels",
  initialState: initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<ChannelsPayload>) => {
      const newQuery = action.payload?.query;
      const newChannels = action.payload?.data || [];
      const newPagination = action.payload?.pagination;

      const prevIds = new Set(state.value.channels.map((c) => c.id));
      const filteredChannels = newChannels.filter((c) => !prevIds.has(c.id));

      if (state.value.query === newQuery) {
        if (filteredChannels.length > 0) {
          console.log("New channels: ", filteredChannels);
          state.value.channels = [...state.value.channels, ...filteredChannels];
        }
      } else {
        console.log("query changed, newQuery: ", newQuery);
        state.value.channels = newChannels;
        state.value.isTerminal = false;
      }

      if (newQuery) {
        state.value.query = newQuery;
      }

      if (newPagination !== null && newPagination.cursor !== undefined && newPagination.cursor !== "") {
        state.value.pagination = newPagination;
      } else {
        console.log("No more channels");
        state.value.isTerminal = true;
      }
    },
    setLiveOnly: (state, action: PayloadAction<boolean>) => {
      state.value.liveOnly = action.payload;
      state.value.pagination = { cursor: "" };
      state.value.isTerminal = false;
    },
    setLanguages: (state, action: PayloadAction<Language[]>) => {
      state.value.languages = action.payload;
      state.value.pagination = { cursor: "" };
      state.value.isTerminal = false;
    },
  },
});

export const { setChannels, setLiveOnly, setLanguages } = channelsSlice.actions;
export default channelsSlice.reducer;
