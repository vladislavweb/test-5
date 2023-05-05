import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { StoryService, UpdateService } from "services";
import { Story } from "types";

import type { RootState } from "../store";

interface StoryState {
  idsOfNewStories: number[];
  stories: Story[];
  loading: boolean;
  error: string | null;
}

const initialState: StoryState = {
  idsOfNewStories: [],
  stories: [],
  loading: false,
  error: null,
};

export const getIDsOfNewStories = createAsyncThunk<
  number[],
  undefined,
  { rejectValue: string }
>("stories/getIDsOfNewStories", async (_, { rejectWithValue }) => {
  const idsOfNewStories = await StoryService.getIDsOfNewStories();

  return idsOfNewStories;
});

export const getStories = createAsyncThunk<
  Story[],
  number[],
  { state: RootState }
>("stories/getStories", async (ids, { getState }) => {
  const currentState = getState();

  const data = await StoryService.getStories(ids);

  return [...currentState.story.stories, ...data];
});

export const getNewStories = createAsyncThunk<
  Story[],
  undefined,
  { state: RootState }
>("stories/getNewStories", async (_, { getState }) => {
  const currentState = getState();

  const idsOfNewStories = (await StoryService.getIDsOfNewStories()).slice(
    0,
    100
  );

  const previousLastNewsIndex = idsOfNewStories.findIndex(
    (id) => id === currentState.story.stories[0].id
  );

  const idsOfLastStories = idsOfNewStories.slice(0, previousLastNewsIndex);

  const newStories = await StoryService.getStories(idsOfLastStories);

  return [...newStories, ...currentState.story.stories].slice(0, 100);
});

export const updateStories = createAsyncThunk<
  Story[],
  undefined,
  { state: RootState }
>("stories/updateStories", async (_, { getState }) => {
  const currentState = getState();
  const stories = currentState.story.stories;

  const updates = await UpdateService.getUpdates();
  const storiesForUpdate = stories.filter((story) =>
    updates.items.includes(story.id)
  );
  const updatedStories = await StoryService.getStories(
    storiesForUpdate.map((story) => story.id)
  );

  const copyStories = structuredClone(stories) as Story[];
  let hasUpdate = false;

  if (updatedStories.length) {
    updatedStories.forEach((story) => {
      const index = stories.findIndex((s) => s.id === story.id);

      if (index >= 0) {
        hasUpdate = true;

        copyStories[index] = story;
      }
    });

    if (hasUpdate) {
      return copyStories.sort((a, b) => b.time - a.time);
    }
  }

  return [];
});

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getStories.fulfilled, (state, action) => {
      state.loading = false;

      state.stories = action.payload;
    });
    builder.addCase(getNewStories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNewStories.fulfilled, (state, action) => {
      state.loading = false;
      state.stories = action.payload;
    });
    builder.addCase(updateStories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateStories.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length) {
        state.stories = action.payload;
      }
    });
    builder.addCase(getIDsOfNewStories.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getIDsOfNewStories.fulfilled, (state, action) => {
      state.idsOfNewStories = action.payload;
    });
  },
});

export default storySlice.reducer;
