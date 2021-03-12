import { useContext } from "react";
import { UserContext } from "../authentication/UserContext";
import { constants } from "@paperpod/common";

export const Feed = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <br />
      <button
        onClick={async () => {
          const response = await fetch(`/api/feeds/${user._id}`);
          console.log(response.status);
          console.log(await response.text());
        }}
      >
        getFeed
      </button>
      Din feed:{" "}
      <a>
        {constants.APPLICATION_URL}/api/feeds/{user._id}
      </a>
    </>
  );
};
