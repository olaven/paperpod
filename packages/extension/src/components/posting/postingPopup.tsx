import * as React from "react";
import { usePosting } from "./usePosting";

export const PostingPopup = () => {
  const status = usePosting("SOME_TEST_TOKEN_REPLACE_ME");
  return (
    <div>Posting popup {"->"} load and stuff whiel posting and do things</div>
  );
};
