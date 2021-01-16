import React, { createContext, useEffect, useState, ReactChild } from "react";
import { models } from "@paperpod/common";
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

    setUser(status === OK ? user : null);
  }, [token]);

  return user;
};

export const UserContextProvider = ({ children }: any) => {

  const [token, setToken] = useState<string>(null);
  const user = useUser(token);

  /*
  TODO: go over this, implement backend endpoint and make sure that it works 
  useEffect(() => {

    if (!token) return null;
    const id = setInterval(async () => {

      const [status, token ] = await get<string>("/authentication/users/session/token"); 
      if (status === OK) {
        setToken(token); 
      } else {

        console.error(`error refreshing token ${status}`); 
      }
    }, 10000 * 180) //i.e. three minutes 

    return () => {

      clearInterval(id); 
    }
  });
  */ 

  return (
    <UserContext.Provider value={{ user, setToken, token }}>
      {children}
    </UserContext.Provider>
  );
};
