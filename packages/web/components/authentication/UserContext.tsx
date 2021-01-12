import React, { createContext, useEffect, useState, ReactChild } from "react";
import { models } from "common";
import { get, OK } from "node-kall";
import { asyncEffect } from "../../helpers/asyncEffect";

export const UserContext = createContext<{
  user: models.User;
  token: string;
  setToken: (token: string) => any;
}>({
  user: null,
  token: null,
  setToken: (t: string) => null,
});

const useUser = (token: string): models.User => {
  const [user, setUser] = useState<models.User>(null);

  asyncEffect(async () => {
    if (!token) return setUser(null);
    const [status, user] = await get<models.User>("/authentication/users/me/", {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    console.log("user", user);
    setUser(status === OK ? user : null);
  }, [token]);

  return user;
};

export const UserContextProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>(null);
  const user = useUser(token);

  return (
    <UserContext.Provider value={{ user, setToken, token }}>
      {children}
    </UserContext.Provider>
  );
};
