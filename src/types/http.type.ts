export interface HttpSuccessResponse<T, K = any> {
  data: T;
  meta?: K;
}

export interface AppError {
  status?: number;
  name?: string;
  message: string;
  details?: any;
}

export interface HttpErrorResponse {
  error: AppError;
}
