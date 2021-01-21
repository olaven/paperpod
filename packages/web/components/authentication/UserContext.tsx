import React, { createContext, useEffect, useState, ReactChild } from "react";
import { models } from "@paperpod/common";
import { get, OK } from "node-kall";
import { asyncEffect } from "../../helpers/asyncEffect";
import { refreshToken } from "./authFetchers";

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

  console.log(user?._id);

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

  useEffect(() => {

    if (!token) return null;
    const id = setInterval(async () => {

      const [status, response ] = await refreshToken(token); 
      
      if (status === OK) {
        
        setToken(response.token); 
      } else {

        console.error(`error refreshing token ${status} with token ${token}`); 
      }
    }, 1000 * 600) //i.e. ten minutes 

    return () => {

      clearInterval(id); 
    }
  });

  return (
    <UserContext.Provider value={{ user, setToken, token }}>
      {children}
    </UserContext.Provider>
  );
};
