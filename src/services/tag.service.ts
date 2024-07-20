import { TagModel } from "@/models";
import { Tag, TagQuery } from "@/types";

export const TagService = new (class {
  async findAll(query: TagQuery): Promise<Tag[]> {
    const queryBuilder = TagModel();

    if (query.ids) {
      queryBuilder.whereIn("id", query.ids);
    }
    if (query.query) {
      queryBuilder.where(function () {
        this.whereLike("name", `%${query.query}%`).orWhereLike(
          "description",
          `%${query.query}%`
        );
      });
    }

    return await queryBuilder;
  }

  async create(tag: Partial<Tag>): Promise<Tag> {
    return TagModel()
      .insert(tag)
      .then(
        (affectedRows) =>
          TagModel().where("id", affectedRows[0]).first() as Promise<Tag>
      );
  }
})();
