import { kebabCase, toNumber } from "lodash";
import { CounterType, IProject } from "types";

export interface AddProjectFormValues
  extends Omit<IProject, "slug" | "counters"> {
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
  return {
    name: values.name,
    slug: kebabCase(values.name),
    counters: [
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
    ],
  };
}
