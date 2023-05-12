import { FC, useEffect } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import lodash from "lodash";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  getIDsOfNewStories,
  getNewStories,
  getStories,
  updateStories,
} from "app/reducers/story";

import { NewsCard } from "./parts";

import "./Home.scss";

const CHUNK_SIZE = 10;

const Home: FC = () => {
  const idsOfNewStories = useAppSelector(
    (state) => state.story.idsOfNewStories
  );
  const stories = useAppSelector((state) => state.story.stories);
  const isLoadingStories = useAppSelector((state) => state.story.loading);
  const dispatch = useAppDispatch();

  const handleGetStories = () => {
    const chunks = lodash.chunk(idsOfNewStories, CHUNK_SIZE);
    const chunk =
      chunks[stories.length === 0 ? 0 : stories.length / CHUNK_SIZE];

    dispatch(getStories(chunk));
  };

  const handleUpdateStories = () => {
    dispatch(updateStories());
  };

  useEffect(() => {
    if (!stories.length) {
      dispatch(getIDsOfNewStories()).then((data) => {
        if (Array.isArray(data.payload) && data.payload.length) {
          dispatch(getStories(data.payload.slice(0, 10)));
        }
      });
    }
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

  return (
    <Grid
      className="home"
      container
      sx={{ height: "100%", flexDirection: "column" }}
    >
      <Grid
        container
        sx={{
          height: "max-content",
          marginBottom: 2,
          justifyContent: "center",
        }}
      >
        <Button
          disabled={isLoadingStories}
          variant="contained"
          onClick={handleUpdateStories}
        >
          Update Stories
        </Button>
      </Grid>

      <Grid
        container
        gap={2}
        sx={{ height: "100%", flex: 1, overflowY: "hidden" }}
      >
        <div id="container">
          <InfiniteScroll
            loader={
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
            }
            hasMore={stories.length < 100}
            dataLength={stories.length}
            next={handleGetStories}
            scrollableTarget={"container"}
          >
            {stories.map((story) => (
              <NewsCard key={story.id} story={story} />
            ))}
          </InfiniteScroll>
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
