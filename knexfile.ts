import type { Knex } from "knex";

// Update with your config settings.
require("dotenv").config();

const config: Knex.Config = {
  client: "better-sqlite3",
  connection: {
    filename: String(process.env.DATABASE_FILE_PATH),
  },
  debug: true,
  migrations: {
    tableName: "migrations",
    directory: "database/migrations",
  },
};

module.exports = config;
