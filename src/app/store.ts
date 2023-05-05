import { configureStore } from "@reduxjs/toolkit";

import storySlice from "./reducers/story";

export const store = configureStore({
  reducer: { story: storySlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
