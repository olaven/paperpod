import { useContext } from "react";
import { UserContext } from "../authentication/UserContext";
import { constants, logger } from "@paperpod/common";

export const Feed = () => {
  const { user } = useContext(UserContext);

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
