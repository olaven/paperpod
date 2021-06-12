import { authentication, FrontendContextProvider } from "@paperpod/frontend";

import * as React from "react";
import ReactDOM from "react-dom";
import { Main } from "./components/main/Main";
import { Host, getHost } from "./getServerHostName";
import { useSessionStorage } from "./storage/storage";

const { store: storeSession, retrieve: retrieveSession } = useSessionStorage();

const render = (hostname: Host) => {
  const Root = (
    <FrontendContextProvider serverHostname={hostname}>
      <authentication.UserContextProvider
        storage={{
          retrieve: retrieveSession,
          store: storeSession,
        }}
      >
        <Main />
      </authentication.UserContextProvider>
    </FrontendContextProvider>
  );

  ReactDOM.render(Root, document.getElementById("root"));
};

(async () => {
  const hostname = await getHost();
  render(hostname);
})();
