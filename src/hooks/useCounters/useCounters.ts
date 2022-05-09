import { database } from "services";
import { IProject } from "types";

export const useCounters = () => {
  const increaseRow = (project: IProject) => {
    const [row, repeat, isLinked] = project.counters;
    const { currentCount, maxCount } = row;

    const increaseValue = currentCount + 1;
    const newValue = increaseValue < maxCount ? increaseValue : 0;

    database.updateProject({
      ...project,
      counters: [{ ...row, currentCount: newValue }, repeat, isLinked],
    });
  };

  return { increaseRow };
};
