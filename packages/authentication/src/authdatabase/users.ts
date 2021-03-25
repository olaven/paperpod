import { first } from "klart";
import { models } from "@paperpod/common";

export const getByEmail = (email: string) =>
  first<models.User>("SELECT * FROM users WHERE email = $1", [email]);

export const deleteUser = (id: string) =>
  first<models.User>("DELETE FROM users WHERE id = $1", [id]);

export const insert = (user: models.User) =>
  first<models.User>(
    `
      INSERT INTO 
      users (email, password_hash)
      VALUES ($1, $2)
      RETURNING *; 
    `,
    [user.email, user.password_hash]
  );
