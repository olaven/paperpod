import * as React from "react";
import { Paragraph } from "@paperpod/ui";
import { usePosting } from "../../effects";

export const Popup = () => {
  const status = usePosting("SOME_TEST_TOKEN_REPLACE_ME");

  return (
    <>
      <h1>Paperpod</h1>
      <Paragraph>Post status: {status}</Paragraph>
    </>
  );
};
