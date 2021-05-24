import * as React from "react";
import ReactDOM from "react-dom";
import { AuthenticationPopup } from "./components/authentication/authenticationpopup";
import { get, store } from "./storage/storage";

ReactDOM.render(<AuthenticationPopup />, document.getElementById("root"));
