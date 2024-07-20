import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "database/db.sqlite3",
    },
    debug: true,
    migrations: {
      tableName: "migrations",
      directory: "database/migrations",
    },
  },
  production: {
    client: "better-sqlite3",
    connection: {
      filename: "database/db.sqlite3",
      options: {
        readonly: true,
      },
    },
    migrations: {
      tableName: "migrations",
      directory: "database/migrations",
    },
  },
};

module.exports = config;
