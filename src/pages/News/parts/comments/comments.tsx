import { FC } from "react";
import { Button, Grid, Link, Paper, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import moment from "moment";
import htmlParser from "html-react-parser";
import CircularProgress from "@mui/material/CircularProgress";

import { Comment } from "types";
import { getUserLink } from "utils";

import type { Props as ContainerProps } from "./container";
import CommentsContainer from "./container";

interface Props extends Omit<ContainerProps, "idsOfComments"> {
  comments: Comment[];
  isLoading?: boolean;
  updateComments: () => Promise<void>;
}

const Comments: FC<Props> = ({
  comments,
  deep = 0,
  shownBranches,
  showBranche,
  isLoading = false,
  updateComments,
}) => {
  const commentUpdateFragment = (comment: Comment) => {
    if (!shownBranches.includes(comment.id)) {
      return null;
    }

    return (
      <Grid item>
        <Button onClick={updateComments} variant="outlined" sx={{ marginTop: 1 }}>
          Update comments
        </Button>
      </Grid>
    );
  };

  const showMoreFragment = (comment: Comment) => {
    const handleShowBranche = () => {
      showBranche(comment.id);
    };

    if (shownBranches.includes(comment.id) || !comment.kids || !comment.kids.length) {
      return null;
    }

    return (
      <Grid item>
        <Button onClick={handleShowBranche} variant="outlined" sx={{ marginTop: 1 }}>
          {`${comment.kids.length} more`}
        </Button>
      </Grid>
    );
  };

  if (isLoading) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container rowGap={1}>
      {comments.map((comment) => {
        return (
          <Grid container key={comment.id} sx={{ marginLeft: deep, marginTop: deep ? 2 : 0 }}>
            <Paper elevation={3} sx={{ width: "100%", padding: 1 }}>
              <Grid container display="flex" alignItems="center">
                <Grid item>
                  <Link href={getUserLink(comment.by)} rel="noopener noreferrer" target="_blank">
                    <Typography variant="h6" sx={{ marginRight: 1 }}>
                      {comment.by}
                    </Typography>
                  </Link>
                </Grid>

                <Grid item display="flex" alignItems="center" sx={{ marginRight: 1 }}>
                  <ScheduleIcon sx={{ marginRight: 1 }} />

                  <Grid>
                    <Typography variant="h6">{moment.unix(comment.time).fromNow()}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container sx={{ lineBreak: "anywhere" }}>
                <Typography variant="body1">{htmlParser(comment.text || "")}</Typography>
              </Grid>

              {showMoreFragment(comment)}

              {commentUpdateFragment(comment)}

              {comment?.kids?.length && shownBranches.includes(comment.id) && (
                <CommentsContainer
                  deep={deep + 1}
                  idsOfComments={comment.kids}
                  shownBranches={shownBranches}
                  showBranche={showBranche}
                />
              )}
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Comments;
