import { withConfiguration } from "klart";

const { NODE_ENV, DATABASE_CA } = process.env;
const configuration =
  NODE_ENV === "production"
    ? {
        ssl: {
          ca: DATABASE_CA,
          rejectUnauthorized: false,
        },
      }
    : {};

export const database = withConfiguration(configuration);
