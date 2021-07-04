import { authentication } from "@paperpod/frontend";

import * as React from "react";
import ReactDOM from "react-dom";
import { Main } from "./components/main/Main";
import { useSessionStorage } from "./storage/storage";

const { store: storeSession, retrieve: retrieveSession } = useSessionStorage();

const render = () => {
  const Root = (
    <authentication.UserContextProvider
      storage={{
        retrieve: retrieveSession,
        store: storeSession,
      }}
    >
      <Main />
    </authentication.UserContextProvider>
  );

  ReactDOM.render(Root, document.getElementById("root"));
};

(async () => {
  render();
})();
