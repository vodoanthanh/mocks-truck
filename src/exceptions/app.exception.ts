import { HttpStatusCode } from "@/constants";

export class AppException extends Error {
  public status?: HttpStatusCode;
  public message: string;
  public details?: any;

  constructor({
    status,
    message,
    name,
    details,
  }: {
    status?: HttpStatusCode;
    message: string;
    name?: string;
    details?: any;
  }) {
    super(message);
    if (name) {
      this.name = name;
    }
    this.status = status;
    this.message = message;
    this.details = details;
  }
}
