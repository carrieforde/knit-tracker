import { kebabCase, toNumber } from "lodash";
import {
  CounterType,
  ICounters,
  IProject,
  IProjectStatus,
  IProjectTimestamps,
} from "types";

export interface AddProjectFormValues extends Pick<IProject, "name"> {
  maxRowCount: number | string;
  currentRowCount: number | string;
  maxRepeatCount: number | string;
  currentRepeatCount: number | string;
  isLinked: boolean | string;
}

export const defaultAddProjectValues: AddProjectFormValues = {
  name: "",
  maxRowCount: 0,
  currentRowCount: 0,
  maxRepeatCount: 0,
  currentRepeatCount: 0,
  isLinked: false,
};

export function getMappedProjectValues(values: AddProjectFormValues): IProject {
  const counters: ICounters = [
    {
      type: CounterType.ROW,
      maxCount: toNumber(values.maxRowCount),
      currentCount: toNumber(values.currentRowCount),
    },
    {
      type: CounterType.REPEAT,
      maxCount: toNumber(values.maxRepeatCount),
      currentCount: toNumber(values.currentRepeatCount),
    },
    typeof values.isLinked === "string"
      ? values.isLinked === "true"
      : values.isLinked,
  ];

  return {
    name: values.name,
    slug: kebabCase(values.name),
    counters,
    progress: getInitialProgress(counters),
    status: getInitialStatus(counters),
    timestamps: getInitialTimestamps(counters),
  };
}

export function getInitialProgress([row, repeat]: ICounters): number {
  if (repeat.maxCount > 0) {
    return (repeat.currentCount / repeat.maxCount) * 100;
  }

  return (row.currentCount / row.maxCount) * 100;
}

export function getInitialStatus([row, repeat]: ICounters): IProjectStatus {
  if (repeat.maxCount > 0 && repeat.currentCount > 0) {
    if (repeat.currentCount === repeat.maxCount) {
      return IProjectStatus.complete;
    }
    return IProjectStatus.inProgress;
  }

  if (row.currentCount > 0) {
    if (row.currentCount === row.maxCount) {
      return IProjectStatus.complete;
    }

    return IProjectStatus.inProgress;
  }

  return IProjectStatus.notStarted;
}

export function getInitialTimestamps([
  row,
  repeat,
]: ICounters): IProjectTimestamps {
  if (repeat.maxCount > 0 && repeat.currentCount > 0) {
    if (repeat.currentCount === repeat.maxCount) {
      return {
        started: null,
        completed: new Date().toISOString(),
        updated: null,
      };
    }
    return {
      started: new Date().toISOString(),
      completed: null,
      updated: new Date().toISOString(),
    };
  }

  if (row.currentCount > 0) {
    if (row.currentCount === row.maxCount) {
      return {
        started: null,
        completed: new Date().toISOString(),
        updated: null,
      };
    }

    return {
      started: new Date().toISOString(),
      completed: null,
      updated: new Date().toISOString(),
    };
  }

  return {
    started: null,
    completed: null,
    updated: null,
  };
}
