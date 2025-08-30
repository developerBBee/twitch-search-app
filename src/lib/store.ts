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

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
