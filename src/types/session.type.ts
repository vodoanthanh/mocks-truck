import { Configuration } from "./configuration.type";

export type APIMockUsage = {
  [endpointRegexAndMethod: string]: number;
};

export interface Session {
  configuration: Configuration;
  usage: APIMockUsage;
}
