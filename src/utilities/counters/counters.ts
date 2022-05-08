import { IProject } from "types";

export function increaseRow(project: IProject): IProject {
  const [row, repeat, isLinked] = project.counters;
  const { currentCount, maxCount } = row;
  const increaseValue = currentCount + 1;
  const newCount = increaseValue < maxCount ? increaseValue : 0;

  if (isLinked && increaseValue === maxCount) {
    const updatedRepeat = increaseRepeat(project).counters[1];

    return {
      ...project,
      counters: [{ ...row, currentCount: newCount }, updatedRepeat, isLinked],
    };
  }

  return {
    ...project,
    counters: [{ ...row, currentCount: newCount }, repeat, isLinked],
  };
}

export function decreaseRow(project: IProject): IProject {
  const [row, repeat, isLinked] = project.counters;
  const { currentCount } = row;
  const decreaseValue = currentCount - 1;
  const newCount = decreaseValue > 0 ? decreaseValue : 0;

  return {
    ...project,
    counters: [{ ...row, currentCount: newCount }, repeat, isLinked],
  };
}

export function increaseRepeat(project: IProject): IProject {
  const [row, repeat, isLinked] = project.counters;
  const { currentCount, maxCount } = repeat;
  const increaseValue = currentCount + 1;
  const newCount = increaseValue < maxCount ? increaseValue : 0;

  return {
    ...project,
    counters: [row, { ...repeat, currentCount: newCount }, isLinked],
  };
}

export function decreaseRepeat(project: IProject): IProject {
  const [row, repeat, isLinked] = project.counters;
  const { currentCount } = repeat;
  const decreaseValue = currentCount - 1;
  const newCount = decreaseValue > 0 ? decreaseValue : 0;

  return {
    ...project,
    counters: [row, { ...repeat, currentCount: newCount }, isLinked],
  };
}
