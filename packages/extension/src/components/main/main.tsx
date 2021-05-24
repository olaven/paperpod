import * as React from "react";
import { authentication } from "@paperpod/frontend";
import { AuthenticationPopup } from "../authentication/authenticationpopup";
import { PostingPopup } from "../posting/PostingPopup";

export const Main = () => {
  const { user } = React.useContext(authentication.UserContext);

  return user ? <PostingPopup /> : <AuthenticationPopup />;
};
