import { FC } from "react";
import { Button, Grid } from "@mui/material";

import { Story } from "types";
import { NewsCard } from "./parts";

interface Props {
  stories: Story[];
  updateStories: any;
}

const Home: FC<Props> = ({ stories, updateStories }) => {
  return (
    <Grid container gap={2}>
      <Button onClick={updateStories}>Update</Button>

      {stories.map((story) => (
        <NewsCard key={story.id} story={story} />
      ))}
    </Grid>
  );
};

export default Home;
