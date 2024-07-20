import _ from "lodash";

import { HttpStatusCode, MESSAGES } from "@/constants";
import { AppException } from "@/exceptions";
import { FormatterHelper } from "@/helpers";
import {
  ConfigurationModel,
  ConfigurationTagTagModel,
  TagModel,
} from "@/models";
import {
  Configuration,
  ConfigurationQuery,
  ConfigurationWithTags,
} from "@/types";

export const ConfigurationService = new (class {
  async findByIdOrThrowError(id: number): Promise<Configuration> {
    const configuration = await ConfigurationModel().where("id", id).first();
    if (configuration) {
      configuration.mocks = FormatterHelper.formatStringToObject(
        configuration.mocks
      );
      return configuration;
    }
    throw new AppException({
      message: MESSAGES.NOT_FOUND.CONFIGURATION,
      status: HttpStatusCode.NotFound,
    });
  }

  async findAll(
    query: ConfigurationQuery
  ): Promise<Omit<ConfigurationWithTags, "mocks">[]> {
    const queryBuilder = ConfigurationModel();
    queryBuilder.select([
      "configurations.id",
      "configurations.name",
      "configurations.description",
      "configurations.createdAt",
      "configurations.updatedAt",
    ]);

    if (query.ids) {
      queryBuilder.whereIn("configurations.id", query.ids);
    }
    if (query.tagIds) {
      queryBuilder.join(
        "configurationsTags",
        "configurations.id",
        "configurationsTags.configurationId"
      );
      queryBuilder.whereIn("configurationsTags.tagId", query.tagIds);
    }
    if (query.query) {
      queryBuilder.where(function () {
        this.whereLike("configurations.name", `%${query.query}%`).orWhereLike(
          "configurations.description",
          `%${query.query}%`
        );
      });
    }

    const configurations: Omit<ConfigurationWithTags, "mocks">[] = (
      await queryBuilder
    ).map((configuration) => ({
      ...configuration,
      tags: [],
    }));

    // Include tags to each configuration
    const configurationsTags = await ConfigurationTagTagModel().whereIn(
      "configurationId",
      _.map(configurations, "id") as number[]
    );
    if (configurationsTags.length) {
      const tags = await TagModel().whereIn(
        "id",
        _.map(configurationsTags, "tagId") as number[]
      );
      const tagsById = _.keyBy(tags, "id");
      const configurationsTagsGroupByConfigurationId = _.groupBy(
        configurationsTags,
        "configurationId"
      );

      configurations.forEach((configuration) => {
        const foundConfigurationsTags =
          configurationsTagsGroupByConfigurationId[configuration.id as number];
        if (foundConfigurationsTags) {
          configuration.tags = _.map(
            foundConfigurationsTags,
            (configurationTag) => tagsById[configurationTag.tagId]
          );
        }
      });
    }

    return configurations;
  }

  async create(data: Partial<ConfigurationWithTags>): Promise<Configuration> {
    const tags = data.tags;
    data = _.omit(data, "tags");

    const configuration = await ConfigurationModel()
      .insert({
        ...data,
        mocks: FormatterHelper.formatObjectToString(data.mocks),
      })
      .then((affectedRows) => this.findByIdOrThrowError(affectedRows[0]));

    if (tags) {
      await ConfigurationTagTagModel().insert(
        tags.map((tag) => ({
          tagId: tag.id,
          configurationId: configuration.id,
        }))
      );
    }

    return configuration;
  }

  async updateById(
    id: number,
    data: Partial<ConfigurationWithTags>
  ): Promise<Configuration> {
    await this.findByIdOrThrowError(id);

    const tags = data.tags;
    data = _.omit(data, "tags");

    if (!_.isEmpty(data)) {
      if (data.mocks) {
        data.mocks = FormatterHelper.formatObjectToString(data.mocks);
      }
      await ConfigurationModel().where("id", id).update(data);
    }

    if (tags) {
      const configurationsTags = await ConfigurationTagTagModel().where(
        "configurationId",
        id
      );
      const existingTagIds = _.map(configurationsTags, "tagId");
      const updatedTagIds = _.map(tags, "id");

      const newTagIds = _.difference(updatedTagIds, existingTagIds);
      if (newTagIds.length) {
        await ConfigurationTagTagModel().insert(
          newTagIds.map((tagId) => ({
            tagId,
            configurationId: id,
          }))
        );
      }

      const removeTagIds = _.difference(existingTagIds, updatedTagIds);
      if (removeTagIds.length) {
        await ConfigurationTagTagModel()
          .where("configurationId", id)
          .whereIn("tagId", removeTagIds)
          .delete();
      }
    }

    return await this.findByIdOrThrowError(id);
  }

  async deleteById(id: number): Promise<boolean> {
    await this.findByIdOrThrowError(id);
    await ConfigurationModel().where("id", id).delete();
    return true;
  }
})();
