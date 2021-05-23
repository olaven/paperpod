import * as React from "react";
import { authentication } from "@paperpod/frontend";

console.log("React", React);
export const AuthenticationPopup = () => (
  <div>
    <authentication.Login />
  </div>
);
