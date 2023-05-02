import { FC } from "react";
import { Grid } from "@mui/material";

import { Story } from "types";
import { NewsCard } from "components";

interface Props {
  stories: Story[];
}

const Home: FC<Props> = ({ stories }) => {
  return (
    <Grid className="home" container gap={2}>
      {stories.map((story) => (
        <NewsCard key={story.id} story={story} />
      ))}
    </Grid>
  );
};

export default Home;
