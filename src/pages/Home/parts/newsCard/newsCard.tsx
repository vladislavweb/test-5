import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography, Grid, Paper } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import StarsIcon from "@mui/icons-material/Stars";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import moment from "moment";

import { Story } from "types";
import { getUserLink } from "utils";

interface Props {
  story: Story;
}

const NewsCard: FC<Props> = ({ story }) => {
  const { id, title, time, by, score, descendants } = story;

  return (
    <Grid container sx={{ padding: 1 }}>
      <Paper elevation={3} sx={{ width: "100%", padding: 1 }}>
        <Grid container rowGap={1}>
          <Grid container>
            <Link to={`/news/${id}`}>
              <Typography variant="h5" component="h6">
                {title}
              </Typography>
            </Link>
          </Grid>

          <Grid container columnGap={4}>
            <Grid item display="flex" alignItems="center" xs="auto">
              <ScheduleIcon sx={{ marginRight: 1 }} />

              <Grid>
                <Typography variant="h6">
                  {moment.unix(time).format("MMMM Do YYYY, hh:mm")}
                </Typography>
              </Grid>
            </Grid>

            <Grid item display="flex" alignItems="center" xs="auto">
              <CommentIcon sx={{ marginRight: 1 }} />

              <Typography variant="h6">{descendants}</Typography>
            </Grid>

            <Grid item display="flex" alignItems="center" xs="auto">
              <StarsIcon sx={{ marginRight: 1 }} />

              <Typography variant="h6">{score}</Typography>
            </Grid>

            <Grid item display="flex" alignItems="center" xs="auto">
              <AccountBoxIcon sx={{ marginRight: 1 }} />

              <Typography variant="h6">
                <Link
                  to={getUserLink(by)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {by}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default NewsCard;
