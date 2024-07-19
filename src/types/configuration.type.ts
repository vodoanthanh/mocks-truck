import { HttpMethod, HttpStatusCode } from "@/constants";

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
  id?: string;
  name?: string;
  description?: string;
  tags?: string[];
  mocks: MockAPIConfig[];
}
