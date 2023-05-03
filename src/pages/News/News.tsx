import { FC } from "react";
import { Grid, Link, Tooltip, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
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
    <Grid container>
      <Grid container>
        <Grid item xs={12}>
          <Link href={story.url} target="_blank" rel="noopener noreferrer">
            <Typography variant="h5">{story.title}</Typography>
          </Link>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item display="flex" alignItems="center" xs="auto" sx={{ marginRight: 2 }}>
          <Tooltip title="Publication date">
            <ScheduleIcon sx={{ marginRight: 1 }} />
          </Tooltip>

          <Grid>
            <Typography variant="h6">{moment.unix(time).fromNow()}</Typography>
          </Grid>
        </Grid>

        <Grid item display="flex" alignItems="center" xs="auto" sx={{ marginRight: 2 }}>
          <Tooltip title="Amount Of Comments">
            <CommentIcon sx={{ marginRight: 1 }} />
          </Tooltip>

          <Typography variant="h6">{descendants}</Typography>
        </Grid>

        <Grid item display="flex" alignItems="center" xs="auto">
          <Tooltip title="Author">
            <AccountBoxIcon sx={{ marginRight: 1 }} />
          </Tooltip>

          <Typography variant="h6">
            <Link href={`${config.USERS_URL}?id=${by}`} rel="noopener noreferrer" target="_blank">
              {by}
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Comments IdsOfComments={kids} shownBranches={shownBranches} showBranche={showBranche} />
      </Grid>
    </Grid>
  );
};

export default News;
