import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { streams: [], pagination: { cursor: "" } },
};

export const streamsSlice = createSlice({
  name: "streams",
  initialState: initialState,
  reducers: {
    setStreams: (state, action) => {
      const newStreams = action.payload?.data || [];
      const prevIds = new Set(state.value.streams.map((s) => s.id));

      const filteredStreams = newStreams.filter((s) => !prevIds.has(s.id));
      state.value.streams.push(...filteredStreams);

      const newPagination = action.payload?.pagination;
      if (newPagination) {
        state.value.pagination = newPagination;
      }
    },
  },
});

export const { setStreams } = streamsSlice.actions;
export default streamsSlice.reducer;
