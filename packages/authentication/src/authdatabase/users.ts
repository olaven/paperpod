import { models } from "@paperpod/common";
import { database } from "@paperpod/server";

const withUsers = database.withCollection<models.User>("users");

export const getByEmail = (email: string) =>
    withUsers(collection =>
        collection.findOne({
            email
        })
    );

export const insert = (user: models.User) =>
    withUsers(
        database.persistHandler(user)
    );