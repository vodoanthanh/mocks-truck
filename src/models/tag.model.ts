import { DatabaseEngine } from "@/helpers";
import { Tag } from "@/types";

export const TagModel = () => DatabaseEngine<Tag>("tags");
