import React, { createContext, useEffect, useState, ReactChild } from "react";
import { models } from "common";
import { get, OK } from "node-kall";
import { asyncEffect } from "../../helpers/asyncEffect";

export const UserContext = createContext<{
  user: models.User;
  refreshUser: () => Promise<void>;
}>({
  user: null,
  refreshUser: async () => {},
});

const useUser = (): [models.User, () => Promise<void>] => {
  const [user, setUser] = useState<models.User>(null);

  const refreshUser = async () => {
    console.log("refreshing user");
    const [status, user] = await get<models.User>("/authentication/users/me/", {
      credentials: "include",
    });

    console.log("user", user);
    setUser(status === OK ? user : null);
  };

  asyncEffect(refreshUser, []);

  return [user, refreshUser];
};

export const UserContextProvider = ({ children }: ReactChild) => {
  const [user, refreshUser] = useUser();

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
