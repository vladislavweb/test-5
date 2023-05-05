import { FC, useEffect } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { getNewStories, getStories, updateStories } from "app/reducers/story";

import { NewsCard } from "./parts";

const Home: FC = () => {
  const stories = useAppSelector((state) => state.story.stories);
  const dispatch = useAppDispatch();

  const handleUpdateStories = () => {
    dispatch(updateStories());
  };

  useEffect(() => {
    dispatch(getStories());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getNewStories());
      dispatch(updateStories());
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!stories.length) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid container sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={handleUpdateStories}>
          Update Stories
        </Button>
      </Grid>

      <Grid container gap={2}>
        {stories.map((story) => (
          <NewsCard key={story.id} story={story} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Home;
