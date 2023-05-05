import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, CircularProgress } from "@mui/material";

import { StoryService } from "services";
import { Story } from "types";

import News from "./News";

const Container: FC = () => {
  const [story, setStory] = useState<Story>();
  const params = useParams<{ newsId: string }>();

  const [shownBranches, setShownBranches] = useState<number[]>([]);

  const showBranche = (id: number) => {
    setShownBranches([...shownBranches, id]);
  };

  useEffect(() => {
    StoryService.getStory(Number(params.newsId)).then((story) => {
      if (story) {
        setStory(story);
      }
    });
  }, []);

  if (!story) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <News
      story={story}
      shownBranches={shownBranches}
      showBranche={showBranche}
    />
  );
};

export default Container;
