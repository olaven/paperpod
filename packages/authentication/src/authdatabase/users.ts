import { models } from "@paperpod/common";
import { database } from "@paperpod/server";

const withUsers = database.withCollection<models.User>("users");

export const getByEmail = (email: string) =>
  withUsers((collection) =>
    collection.findOne({
      email,
    })
  );

export const deleteUser = (_id: string) =>
  withUsers((collection) =>
    collection.deleteOne({
      _id,
    })
  );

export const insert = (user: models.User) =>
  withUsers(database.persistHandler(user));
