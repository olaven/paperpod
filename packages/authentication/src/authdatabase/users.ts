import { models } from "@paperpod/common";
import { database } from "@paperpod/server";

export const getByEmail = async (email: string) =>
  (await database()).first<models.User>(
    "SELECT * FROM authentication.users WHERE email = $1",
    [email]
  );

export const deleteUser = async (id: string) =>
  (await database()).first<models.User>(
    "DELETE FROM authentication.users WHERE id = $1",
    [id]
  );

export const insert = async (user: models.User) =>
  (await database()).first<models.User>(
    `
      INSERT INTO 
      authentication.users (email, password_hash)
      VALUES ($1, $2)
      RETURNING *; 
    `,
    [user.email, user.password_hash]
  );
