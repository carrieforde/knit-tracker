import { ICounter, CounterType } from "./counter.type";

export interface IProject {
  slug: string;
  name: string;
  counters: [ICounter<CounterType.ROW>, ICounter<CounterType.REPEAT>, boolean];
}
