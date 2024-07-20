import { AppException } from "@/exceptions";

export interface HttpSuccessResponse<T, K = any> {
  data: T;
  meta?: K;
}

export interface HttpErrorResponse {
  error: AppException;
}
