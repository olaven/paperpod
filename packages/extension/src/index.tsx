import { logger } from "@paperpod/common";
import { authentication, FrontendContextProvider } from "@paperpod/frontend";

import * as React from "react";
import ReactDOM from "react-dom";
import { Main } from "./components/main/Main";

const render = (host: "" | "https://paperpod.fm") => {
  const Root = (
    <FrontendContextProvider serverHostname={host}>
      <authentication.UserContextProvider>
        <Main />
      </authentication.UserContextProvider>
    </FrontendContextProvider>
  );

  ReactDOM.render(Root, document.getElementById("root"));
};

logger.debug(`chrome ${chrome}`);

if (chrome !== undefined) {
  logger.debug("looks to be running as extension");
  chrome.management.get(chrome.runtime.id, (info) => {
    render(info.installType === "development" ? "" : "https://paperpod.fm");
  });
} else {
  logger.debug("looks to be running outside of extension");
  render("");
}
