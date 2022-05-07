import { Counter } from "./counter.type";

export interface Project extends Counter {
  slug: string;
  name: string;
}
