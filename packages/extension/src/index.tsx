import * as React from "react";
import ReactDOM from "react-dom";
import { AuthenticationPopup } from "./components/authentication/authenticationpopup";
import { get, store } from "./storage/storage";

const StorageTest = () => {
  return (
    <div>
      <button
        onClick={async () => {
          await store("paperpod.logged_in", true);
        }}
      >
        store
      </button>

      <button
        onClick={async () => {
          const result = await get<boolean>("paperpod.logged_in");
          console.log(`result was ${result}`);
        }}
      >
        get
      </button>
    </div>
  );
};

ReactDOM.render(<StorageTest />, document.getElementById("root"));
