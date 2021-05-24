import { authentication } from "@paperpod/frontend";
import * as React from "react";
import ReactDOM from "react-dom";
import { Main } from "./components/main/Main";

ReactDOM.render(
  <authentication.UserContextProvider>
    <Main />
  </authentication.UserContextProvider>,
  document.getElementById("root")
);
