import { FC, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { Story } from "types";

import News from "./News";

const Container: FC = () => {
  const story = useLoaderData() as Story;
  const [shownBranches, setShownBranches] = useState<number[]>([]);

  const showBranche = (id: number) => {
    setShownBranches([...shownBranches, id]);
  };

  return <News story={story} shownBranches={shownBranches} showBranche={showBranche} />;
};

export default Container;
