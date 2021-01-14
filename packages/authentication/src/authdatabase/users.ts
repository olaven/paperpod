import { models, server } from "common";
import { WithId } from "mongodb";

const withUsers = server.database.withCollection<models.User>("users");

export const getByEmail = (email: string) =>
    withUsers(collection =>
        collection.findOne({
            email: email
        })
    );

export const insert = (user: models.User) =>
    withUsers(
        server.database.persistHandler(user)
    );