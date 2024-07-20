import { HttpMethod, HttpStatusCode } from "@/constants";
import { Tag } from "./tag.type";

export interface MockAPIResponse {
  httpStatus: HttpStatusCode;
  dataResponse: any;
}

export interface MockAPIConfig {
  endpointRegex: string;
  method: HttpMethod;
  description?: string;
  response: MockAPIResponse;
}

export interface Configuration {
  id?: number;
  name?: string;
  description?: string;
  mocks: MockAPIConfig[] | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConfigurationTag {
  id: number;
  configurationId: number;
  tagId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConfigurationQuery {
  query?: string;
  tagIds?: number[];
  ids?: number[];
}

export interface ConfigurationWithTags extends Configuration {
  tags: Tag[];
}
