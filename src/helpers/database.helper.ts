import type { Knex } from "knex";
import knex from "knex";

console.log(1);

export const getDatabaseConfig = (): Knex.Config => ({
  client: "better-sqlite3",
  debug: true,
  useNullAsDefault: false,
  connection: {
    filename: String(process.env.DATABASE_FILE_PATH),
  },
});

export const DatabaseEngine = knex(getDatabaseConfig());
