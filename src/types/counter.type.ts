export enum CounterType {
  ROW = "row",
  REPEAT = "repeat",
}

export interface ICounter<T extends CounterType> {
  type: T;
  maxCount: number;
  currentCount: number;
  isLinked?: boolean;
}

export type ICounters = [
  ICounter<CounterType.ROW>,
  ICounter<CounterType.REPEAT>,
  boolean
];
