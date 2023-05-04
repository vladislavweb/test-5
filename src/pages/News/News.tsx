import { FC } from "react";
import { Grid, Link, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowBack from "@mui/icons-material/ArrowBack";
import moment from "moment";

import { Comments } from "./parts";
import { Story } from "types";

import config from "../../application.json";

interface Props {
  story: Story;
  shownBranches: number[];
  showBranche: (id: number) => void;
}

const News: FC<Props> = ({ story, shownBranches, showBranche }) => {
  const { time, descendants, by, kids } = story;

  return (
    <Grid container sx={{ rowGap: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Link href={story.url} target="_blank" rel="noopener noreferrer">
            <Typography variant="h5">{story.title}</Typography>
          </Link>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item display="flex" alignItems="center" xs="auto" sx={{ marginRight: 2 }}>
          <Link href="/">
            <ArrowBack />
          </Link>
        </Grid>

        <Grid item display="flex" alignItems="center" xs="auto" sx={{ marginRight: 2 }}>
          <ScheduleIcon sx={{ marginRight: 1 }} />

          <Grid>
            <Typography variant="h6">{moment.unix(time).fromNow()}</Typography>
          </Grid>
        </Grid>

        <Grid item display="flex" alignItems="center" xs="auto" sx={{ marginRight: 2 }}>
          <CommentIcon sx={{ marginRight: 1 }} />

          <Typography variant="h6">{descendants}</Typography>
        </Grid>

        <Grid item display="flex" alignItems="center" xs="auto">
          <AccountBoxIcon sx={{ marginRight: 1 }} />

          <Typography variant="h6">
            <Link href={`${config.USERS_URL}?id=${by}`} rel="noopener noreferrer" target="_blank">
              {by}
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ rowGap: 2 }}>
        {kids.map((kid) => (
          <Comments
            key={kid}
            idsOfComments={[kid]}
            shownBranches={shownBranches}
            showBranche={showBranche}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default News;
