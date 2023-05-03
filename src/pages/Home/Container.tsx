import { FC, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { StoryService } from "services";
import { useShortPolling } from "hooks";
import { Story } from "types";

import Home from "./Home";

const Container: FC = () => {
  const [stories, setStories] = useState<Story[]>([]);

  const getStories = async () => {
    const idsOfNewStories: number[] = [];

    await StoryService.getIDsOfNewStories().then((res) => {
      idsOfNewStories.push(...res.data.slice(0, 100));
    });

    await StoryService.getStories(idsOfNewStories).then((data) => {
      if (data) {
        setStories(data);
      }
    });
  };

  useEffect(() => {
    getStories();
  }, []);

  useShortPolling(getStories, 1000);

  if (!stories.length) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  return <Home stories={stories} />;
};

export default Container;
