import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelsState, TwitchApiResponse, TwitchChannel } from "../../types";

interface ChannelsPayload extends TwitchApiResponse<TwitchChannel> {
  query?: string;
}

const initialState: { value: ChannelsState } = {
  value: { channels: [], query: "", pagination: { cursor: "" }, liveOnly: false, languages: [] },
};

export const channelsSlice = createSlice({
  name: "channels",
  initialState: initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<ChannelsPayload>) => {
      const newQuery = action.payload?.query;
      const newChannels = action.payload?.data || [];
      const newPagination = action.payload?.pagination;

      if (state.value.query === newQuery) {
        const prevIds = new Set(state.value.channels.map((c) => c.id));
        const filteredChannels = newChannels.filter((c) => !prevIds.has(c.id));
        state.value.channels.push(...filteredChannels);
      } else {
        state.value.channels = newChannels;
      }

      if (newQuery) {
        state.value.query = newQuery;
      }

      if (newPagination) {
        state.value.pagination = newPagination;
      }
    },
    setLiveOnly: (state, action: PayloadAction<boolean>) => {
      state.value.liveOnly = action.payload;
    },
    setLanguages: (state, action: PayloadAction<string[]>) => {
      state.value.languages = action.payload;
    },
  },
});

export const { setChannels, setLiveOnly, setLanguages } = channelsSlice.actions;
export default channelsSlice.reducer;
