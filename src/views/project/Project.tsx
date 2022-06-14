import { Typography } from "@mui/material";
import { Layout } from "components/Layout/Layout";
import { capitalize, isEmpty, isNull } from "lodash";
import { useProjectContext } from "providers";
import React, { useCallback } from "react";
import { UpdateType } from "services";
import { CounterType, IProjectStatus } from "types";
import { Counter } from "./components";

export const Project = () => {
  const { project, updateProject } = useProjectContext();

  const handleCounters = useCallback(
    (updateType: UpdateType) => {
      if (!project) {
        return null;
      }

      updateProject(project, updateType);
    },
    [project, updateProject]
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

  if (isEmpty(project) || isNull(project)) {
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
