import { AppError, HttpErrorResponse, HttpSuccessResponse } from "@/types";
import _ from "lodash";

export const HttpHelper = new (class {
  buildSuccessResponse<T, K extends any>(
    data: T,
    meta?: K
  ): HttpSuccessResponse<T, K> {
    return {
      data,
      meta,
    };
  }

  buildErrorResponse(error: AppError | Error): HttpErrorResponse {
    return {
      error: _.pick(error, [
        "name",
        "message",
        "status",
        "details",
      ]) as AppError,
    };
  }
})();
