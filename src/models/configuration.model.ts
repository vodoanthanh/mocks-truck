import { DatabaseEngine } from "@/helpers";
import { Configuration } from "@/types";

export const ConfigurationModel = () =>
  DatabaseEngine<Configuration>("configurations");
