import { FC, useEffect, useState } from "react";
import { Button, Grid, Link, Paper, Tooltip, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import moment from "moment";
import htmlParser from "html-react-parser";

import { CommentService } from "services";
import { Comment } from "types";

import { getUserLink } from "utils";

interface Props {
  IdsOfComments: number[];
  deep?: number;
  shownBranches: number[];
  showBranche: (id: number) => void;
}

const Comments: FC<Props> = ({ IdsOfComments, deep = 0, shownBranches, showBranche }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    CommentService.getComments(IdsOfComments).then((data) => {
      if (data) {
        setComments(data);
      }
    });
  }, []);

  const showMore = (comment: Comment) => {
    return (
      <>
        {comment.kids?.length && !shownBranches.includes(comment.id) && (
          <Grid item>
            <Button
              onClick={() => {
                showBranche(comment.id);
              }}
              variant="outlined"
            >
              {comment.kids.length} more
            </Button>
          </Grid>
        )}
      </>
    );
  };

  return (
    <Grid container rowGap={1}>
      {comments.map((comment) => {
        return (
          <Grid container key={comment.id} sx={{ marginLeft: deep }}>
            <Paper elevation={3} sx={{ width: "100%", margin: 1, padding: 1 }}>
              <Grid container display="flex" alignItems="center">
                <Grid item>
                  <Link href={getUserLink(comment.by)} rel="noopener noreferrer" target="_blank">
                    <Typography variant="h6" sx={{ marginRight: 1 }}>
                      {comment.by}
                    </Typography>
                  </Link>
                </Grid>

                <Grid display="flex" alignItems="center" sx={{ marginRight: 1 }}>
                  <Tooltip title="Publication date">
                    <ScheduleIcon sx={{ marginRight: 1 }} />
                  </Tooltip>

                  <Grid>
                    <Typography variant="h6">{moment.unix(comment.time).fromNow()}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container sx={{ lineBreak: "anywhere" }}>
                <Typography variant="body1">{htmlParser(comment.text || "")}</Typography>
              </Grid>

              {showMore(comment)}

              {comment?.kids?.length && shownBranches.includes(comment.id) && (
                <Comments
                  IdsOfComments={comment.kids}
                  deep={deep + 1}
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
