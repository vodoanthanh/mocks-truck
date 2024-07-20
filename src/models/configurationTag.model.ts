import { DatabaseEngine } from "@/helpers";
import { ConfigurationTag } from "@/types";

export const ConfigurationTagTagModel = () =>
  DatabaseEngine<ConfigurationTag>("configurationsTags");
