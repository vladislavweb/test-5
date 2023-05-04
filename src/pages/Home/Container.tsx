import { FC, useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { StoryService } from "services";
import { Story } from "types";

import Home from "./Home";
import axios from "axios";

const Container: FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const storiesRef = useRef<Story[]>([]);

  useEffect(() => {
    storiesRef.current = stories;
  }, [stories]);

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

  const getNewStories = async () => {
    const idsOfNewStories = (await StoryService.getIDsOfNewStories()).data.slice(0, 100);

    const previousLastNewsIndex = idsOfNewStories.findIndex(
      (id) => id === storiesRef.current[0].id
    );

    const newStories = idsOfNewStories.slice(0, previousLastNewsIndex);

    if (newStories.length) {
      await StoryService.getStories(newStories).then((data) => {
        if (data) {
          setStories([...data, ...storiesRef.current].slice(0, 100));
        }
      });
    }
  };

  const updateStories = async () => {
    const updates = await axios.get<{ items: number[] }>(
      "https://hacker-news.firebaseio.com/v0/updates.json?print=pretty",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const storiesForUpdate = stories.filter((story) => updates.data.items.includes(story.id));

    const updatedStories = await StoryService.getStories(storiesForUpdate.map((story) => story.id));
    const copyStories = [...stories];
    let hasUpdate = false;

    if (updatedStories) {
      updatedStories.forEach((story) => {
        const index = stories.findIndex((s) => s.id === story.id);

        if (index >= 1) {
          hasUpdate = true;

          copyStories[index] = story;
        }
      });

      if (hasUpdate) {
        const sorted = copyStories.sort((a, b) => b.time - a.time);

        setStories(sorted);
      }
    }
  };

  useEffect(() => {
    getStories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getNewStories();
      updateStories();
    }, 1000 * 10);

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

  return <Home stories={stories} updateStories={updateStories} />;
};

export default Container;
