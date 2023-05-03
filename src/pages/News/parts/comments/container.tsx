import { FC, useEffect, useState } from "react";

import { CommentService } from "services";
import { Comment } from "types";

import Comments from "./comments";

export interface Props {
  deep?: number;
  idsOfComments: number[];
  shownBranches: number[];
  showBranche: (id: number) => void;
}

const Container: FC<Props> = ({ deep = 0, idsOfComments, shownBranches, showBranche }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getComments = async () => {
    setIsLoading(true);

    CommentService.getComments(idsOfComments)
      .then((data) => {
        if (data) {
          setComments(data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Comments
      deep={deep}
      comments={comments}
      showBranche={showBranche}
      shownBranches={shownBranches}
      isLoading={isLoading}
      updateComments={getComments}
    />
  );
};

export default Container;
