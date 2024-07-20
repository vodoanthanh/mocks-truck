import _ from "lodash";

import { AppException } from "@/exceptions";
import { HttpErrorResponse, HttpSuccessResponse } from "@/types";

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

  buildErrorResponse(error: AppException | Error): HttpErrorResponse {
    return {
      error: _.pick(error, [
        "name",
        "message",
        "status",
        "details",
      ]) as AppException,
    };
  }
})();
