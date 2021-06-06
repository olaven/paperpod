import * as React from "react";
import { models } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { get, OK } from "node-kall";
import { useRouter } from "next/router";
import { FrontendContext } from "../FrontendContext";

export const UserContext = React.createContext<{
  user: models.User;
  token: string;
  setToken: (token: string) => any;
}>({
  user: null,
  token: null,
  setToken: (t: string) => null,
});

const useUser = (token: string): models.User => {
  const { serverHostname } = React.useContext(FrontendContext);

  const [user, setUser] = React.useState<models.User>(null);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      if (!token) {
        setUser(null);
        return null;
      }
      const [status, user] = await fetchers.auth.getMe(token, {
        serverHostname,
      });

      setUser(status === OK ? user : null);
      if (user) router.push("/home");
    })();
  }, [token]);

  return user;
};

type UserContextArguments = {
  children: any;
};
export const UserContextProvider = ({ children }: UserContextArguments) => {
  const { serverHostname } = React.useContext(FrontendContext);
  const [token, setToken] = React.useState<string>(null);

  const user = useUser(token);

  React.useEffect(() => {
    if (!token) return null;
    const id = setInterval(async () => {
      const [status, response] = await fetchers.auth.refreshToken(token, {
        serverHostname,
      });

      if (status === OK) {
        setToken(response.token);
      } else {
        console.error(`error refreshing token ${status} with token ${token}`);
      }
    }, 1000 * 600); //i.e. ten minutes

    return () => {
      clearInterval(id);
    };
  });

  return (
    <UserContext.Provider value={{ user, setToken, token }}>
      {children}
    </UserContext.Provider>
  );
};
