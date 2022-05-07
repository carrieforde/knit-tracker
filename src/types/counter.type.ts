export enum CounterType {
  ROW = "row",
  REPEAT = "repeat",
}

export interface Counter<T extends CounterType> {
  type: T;
  maxCount: number;
  currentCount: number;
  isLinked?: boolean;
}
