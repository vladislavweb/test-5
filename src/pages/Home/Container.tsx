import { FC, useContext, useEffect } from "react";

import { StoryContext } from "providers";
import { useShortPolling } from "hooks";

import Home from "./Home";

const Container: FC = () => {
  const { getStories, stories } = useContext(StoryContext);

  useEffect(() => {
    getStories();
  }, []);

  useShortPolling(getStories, 2000);

  return <Home stories={stories} />;
};

export default Container;
