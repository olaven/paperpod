import { boot } from "@paperpod/server";
import { app } from "./app";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGSSLMODE } = process.env;
console.log(`
    Going to start authentication with database envs: 
    PGHOST: ${PGHOST},
    PGDATABASE: ${PGDATABASE},
    PGUSER: ${PGUSER},
    PGPASSWORD: ${PGPASSWORD},
    PGSSLMODE: ${PGSSLMODE},
`);

boot("/authentication", app);
