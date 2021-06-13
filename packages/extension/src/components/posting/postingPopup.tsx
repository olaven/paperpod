import { UserContext } from "@paperpod/frontend/src/authentication/UserContext";
import { Paragraph } from "@paperpod/ui";
import * as React from "react";
import { usePosting } from "./usePosting";

export const PostingPopup = () => {
  const { token, user } = React.useContext(UserContext);
  const status = usePosting(token);

  return (
    <>
      <Paragraph>Posting to {user.email}</Paragraph>
      <Paragraph>status: {status}</Paragraph>
    </>
  );
};
