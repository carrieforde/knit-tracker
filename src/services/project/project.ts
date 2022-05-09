import { isNull } from "lodash";
import { ICounters, IProject, IProjectStatus, IProjectTimestamps } from "types";

export function increaseRow(project: IProject): IProject {
  const [row, repeat, isLinked] = project.counters;
  const { currentCount, maxCount } = row;
  const increaseValue = currentCount + 1;
  const newCount = increaseValue < maxCount ? increaseValue : 0;

  if (isLinked && increaseValue === maxCount) {
    const updatedProject = increaseRepeat(project);

    return {
      ...updatedProject,
      counters: [
        { ...row, currentCount: newCount },
        updatedProject.counters[1],
        isLinked,
      ],
    };
  }

  return {
    ...project,
    timestamps: updateTimestamps(
      project.timestamps,
      increaseValue === row.maxCount
    ),
    status:
      increaseValue === row.maxCount
        ? IProjectStatus.complete
        : IProjectStatus.inProgress,
    progress: (increaseValue / row.maxCount) * 100,
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
    timestamps: updateTimestamps(
      project.timestamps,
      increaseValue === maxCount
    ),
    status:
      increaseValue === maxCount
        ? IProjectStatus.complete
        : IProjectStatus.inProgress,
    progress: (increaseValue / maxCount) * 100,
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

export function calculateProgress(counters: ICounters): number {
  const [row, repeat] = counters;

  if (repeat.maxCount > 0) {
    return (repeat.currentCount / repeat.maxCount) * 100;
  }

  if (row.currentCount > 0) {
    return (row.currentCount / row.maxCount) * 100;
  }

  return 0;
}

export function updateTimestamps(
  timestamps: IProjectTimestamps,
  isComplete: boolean
): IProjectTimestamps {
  const updatedTimestamps = { ...timestamps };
  const { started, completed } = timestamps;

  if (!started) {
    updatedTimestamps.started = new Date().toISOString();
  }

  if (isComplete && isNull(completed)) {
    updatedTimestamps.completed = new Date().toISOString();
  }

  return { ...updatedTimestamps, updated: new Date().toISOString() };
}
