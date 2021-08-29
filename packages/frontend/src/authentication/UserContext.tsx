import * as React from "react";
import { logger, models } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { OK } from "node-kall";
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

  /**
   * Prefer token stored in memory.
   * Then, check if `storage` is available.
   *
   * If not, try without (i.e. nul).
   * The token may be in short lived http cookie
   */
  const getToken = async () => {
    const memory = await token();
    if (memory) return memory;

    const inStorage = storage && (await storage.retrieve());
    if (inStorage) return inStorage;

    return null;
  };

  asyncEffect(async () => {
    const refreshToken = async () => {
      const [status, response] = await fetchers.auth.refreshToken(
        await getToken()
      );

      if (status === OK) {
        setToken(response.token);
      } else {
        logger.error(`error refreshing token ${status} with token ${token}`);
      }
    };

    /*do an initial refresh on load
    -> user may have just been updated in db through getting a subscription*/
    await refreshToken();
    const id = setInterval(refreshToken, 1000 * 60 * 15); //i.e. fifteen

    return () => {
      clearInterval(id);
    };
  }, []);

  asyncEffect(async () => {
    if (!token) {
      setUser(null);
      return null;
    }

    const [status, user] = await fetchers.auth.getMe(await token());

    setUser(status === OK ? user : null);
  }, [_token]);

  return (
    <UserContext.Provider value={{ user, setToken, token }}>
      {children}
    </UserContext.Provider>
  );
};
