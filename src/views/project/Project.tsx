import { Typography } from "@mui/material";
import { Layout } from "components/Layout/Layout";
import { useProjects } from "hooks";
import { capitalize } from "lodash";
import { useProjectContext } from "providers";
import React, { useCallback } from "react";
import { updateProject, UpdateType } from "services";
import { CounterType, IProjectStatus } from "types";
import { Counter } from "./components";

export const Project = () => {
  const { patchProject } = useProjects();

  const project = useProjectContext();

  const handleCounters = useCallback(
    (updateType: UpdateType) => {
      if (!project) {
        return null;
      }

      const value = updateProject(project, updateType);

      patchProject(value);
    },
    [project, patchProject]
  );

  const handleIncreaseRow = useCallback(
    () => handleCounters(UpdateType.incrementRow),
    [handleCounters]
  );

  const handleDecreaseRow = useCallback(
    () => handleCounters(UpdateType.decrementRow),
    [handleCounters]
  );

  const handleIncreaseRepeat = useCallback(
    () => handleCounters(UpdateType.incrementRepeat),
    [handleCounters]
  );

  const handleDecreaseRepeat = useCallback(
    () => handleCounters(UpdateType.decrementRepeat),
    [handleCounters]
  );

  if (!project) {
    return null;
  }

  const {
    name,
    counters: [rowCounter, repeatCounter],
    timestamps: { completed },
    status,
  } = project;

  const isDisabled = status === IProjectStatus.complete || !!completed;

  return (
    <Layout>
      <Typography>{name}</Typography>
      <Counter
        disabled={isDisabled}
        title={capitalize(CounterType.ROW)}
        value={rowCounter.currentCount}
        onDecrease={handleDecreaseRow}
        onIncrease={handleIncreaseRow}
      />

      <Counter
        disabled={isDisabled}
        title="Repeats"
        value={repeatCounter.currentCount}
        onDecrease={handleDecreaseRepeat}
        onIncrease={handleIncreaseRepeat}
      />
    </Layout>
  );
};
