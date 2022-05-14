import { toNumber } from "lodash";
import { addProject } from "services";
import { CounterType, ICounters, IProject } from "types";

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

  return addProject({
    name: values.name,
    counters,
  });
}
