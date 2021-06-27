import * as React from "react";
import { logger, models } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { OK } from "node-kall";
import { FrontendContext } from "../FrontendContext";
import { asyncEffect } from "../asyncEffect";

export const UserContext = React.createContext<{
  user: models.User;
  token: () => Promise<string>;
  setToken: (token: string) => any;
}>({
  user: null,
  token: null,
  setToken: (t: string) => null,
});

type UserContextArguments = {
  children: any;
  /**
   * Use this callback to provide a method
   * of storing the token permanently and
   * retrieving the stored token.
   *
   * WARNING:
   * Be careful about how you store tokens.
   */
  storage?: {
    retrieve: () => string | null | Promise<string | null>;
    store: (token: string) => void | Promise<void>;
  };
};
export const UserContextProvider = ({
  children,
  storage,
}: UserContextArguments) => {
  const { serverHostname } = React.useContext(FrontendContext);
  const [_token, setStateToken] = React.useState<string>(null);
  const [user, setUser] = React.useState<models.User>(null);

  /**
   * Wrapper around token with storage support
   *
   * State token is returned when present.
   * If storage is enabled and state token is
   * falsy, storage is checked.
   */
  const token = async () => {
    if (_token) return _token;
    if (storage) {
      const tokenFromStorage = await storage.retrieve();
      return tokenFromStorage;
    }

    // null at this point
    return _token;
  };

  /**
   * If permanent storage is enabled,
   * we want to store the token in
   * the storage as well as in state.
   *
   * If not, only state should be used.
   */
  const setToken = storage
    ? async (token: string) => {
        logger.debug(`Storing token ${token} in both state and storage`);
        setStateToken(token);
        await storage.store(token);
      }
    : setStateToken;

  asyncEffect(async () => {
    const updatedToken = storage ? await storage.retrieve() : token;
    if (!updatedToken) return null;
    const id = setInterval(async () => {
      const [status, response] = await fetchers.auth.refreshToken(
        await token(),
        {
          serverHostname,
        }
      );

      console.log("Going to refetching token");
      if (status === OK) {
        setToken(response.token);
      } else {
        console.error(`error refreshing token ${status} with token ${token}`);
      }
    }, 1000 * 60 * 5); //i.e. five minutes

    return () => {
      clearInterval(id);
    };
  }, []);

  asyncEffect(async () => {
    if (!token) {
      setUser(null);
      return null;
    }

    const [status, user] = await fetchers.auth.getMe(await token(), {
      serverHostname,
    });

    setUser(status === OK ? user : null);
  }, [_token]);

  return (
    <UserContext.Provider value={{ user, setToken, token }}>
      {children}
    </UserContext.Provider>
  );
};
