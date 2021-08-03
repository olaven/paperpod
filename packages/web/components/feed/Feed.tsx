import * as React from "react";
import { authentication } from "@paperpod/frontend";
import { constants, logger } from "@paperpod/common";
import { A, Paragraph } from "@paperpod/ui";

export const Feed = () => {
  const { user } = React.useContext(authentication.UserContext);

  const feed = `${constants.APPLICATION_URL()}/api/feeds/${user.id}`;
  return (
    <>
      <h3>Add this to your podcast-player!</h3>
      <Paragraph>
        <A href={feed}>{feed}</A>
        <br />
        Add this to your podcast player and your articles will automatically
        start showing up as podcast episodes!
      </Paragraph>
    </>
  );
};
