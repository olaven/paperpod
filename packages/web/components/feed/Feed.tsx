import * as React from "react";
import { authentication } from "@paperpod/frontend";
import { constants, logger } from "@paperpod/common";

export const Feed = () => {
  const { user } = React.useContext(authentication.UserContext);

  return (
    <>
      <br />
      <button
        onClick={async () => {
          const response = await fetch(`/api/feeds/${user.id}`);
          logger.debug(await response.text(), response.status);
        }}
      >
        getFeed
      </button>
      Din feed:{" "}
      <a>
        {constants.APPLICATION_URL}/api/feeds/{user.id}
      </a>
    </>
  );
};
