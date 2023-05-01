import { FC, ReactNode, createContext, useState } from "react";

import { StoryService } from "services";
import { Story } from "types";

type Props = FC<{
  children?: ReactNode;
}>;

interface StoryProviderInterface {
  stories: Story[];
  getStories: () => Promise<void>;
}

export const StoryContext = createContext<StoryProviderInterface>({
  stories: [],
  getStories: () => Promise.reject(),
});

export const StoryProvider: Props = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);

  const getStories = async () => {
    const idsOfNewStories: number[] = [];

    await StoryService.getIDsOfNewStories().then((res) => {
      idsOfNewStories.push(...res.data.slice(0, 100));
    });

    await StoryService.getStories(idsOfNewStories).then((res) => {
      if (res) {
        setStories(res.map((story) => story.data));
      }
    });
  };

  return <StoryContext.Provider value={{ stories, getStories }}>{children}</StoryContext.Provider>;
};
