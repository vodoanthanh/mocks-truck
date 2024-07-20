import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("configurations", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("description", 255);
      table.text("mocks").notNullable();
      table.timestamps(true, true, true);
    })
    .createTable("tags", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("description", 255);
      table.timestamps(true, true, true);
    })
    .createTable("configurationsTags", function (table) {
      table.increments("id");
      table.integer("configurationId").notNullable();
      table
        .foreign("configurationId")
        .references("id")
        .inTable("configurations")
        .onDelete("CASCADE");
      table.integer("tagId").notNullable();
      table
        .foreign("tagId")
        .references("id")
        .inTable("tags")
        .onDelete("CASCADE");
      table.timestamps(true, true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("configurations")
    .dropTable("tags")
    .dropTable("configurationsTags");
}
