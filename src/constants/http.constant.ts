export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  UnprocessableContent = 422,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

export const HTTP_SESSION_ID_HEADER = "x-session-id";

export const SPLIT_ITEM_SYMBOL = ";";
