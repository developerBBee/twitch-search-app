import { configureStore } from "@reduxjs/toolkit";
import streamsReducer from "./features/streamsSlice";
import channelsReducer from "./features/channelsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      streams: streamsReducer,
      channels: channelsReducer,
    },
  });
