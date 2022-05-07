import { Counter, CounterType } from "./counter.type";

export interface Project {
  slug: string;
  name: string;
  counters: [Counter<CounterType.ROW>, Counter<CounterType.REPEAT>, boolean];
}
