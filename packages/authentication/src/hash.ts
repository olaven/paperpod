import bcrypt from "bcrypt";

export const hash = (password: string) =>
    bcrypt.hashSync(password, 10);