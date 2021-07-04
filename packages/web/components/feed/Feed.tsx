import * as React from "react";
import { authentication } from "@paperpod/frontend";
import { constants, logger } from "@paperpod/common";

export const Feed = () => {
  const { user } = React.useContext(authentication.UserContext);

  const feed = `${constants.APPLICATION_URL()}/api/feeds/${user.id}`;
  return (
    <>
      <br />
      Din feed: <a href={feed}>{feed}</a>
    </>
  );
};
