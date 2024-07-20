import knex from "knex";

const getConfig = () => {
  const isProduction = process.env.NODE_ENV != "development";

  if (isProduction) {
    return {
      client: "better-sqlite3",
      useNullAsDefault: false,
      connection: {
        filename: "database/db.sqlite3",
        options: {
          readonly: true,
        },
      },
    };
  }

  return {
    client: "better-sqlite3",
    debug: true,
    useNullAsDefault: false,
    connection: {
      filename: "database/db.sqlite3",
    },
  };
};

export const DatabaseEngine = knex(getConfig());
