import { FC, useEffect, useState } from "react";

import { StoryService } from "services";
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

  // useShortPolling(getStories, 2000);

  return <Home stories={stories} />;
};

export default Container;
