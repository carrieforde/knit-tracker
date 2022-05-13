import { Typography } from "@mui/material";
import { Layout } from "components/Layout/Layout";
import { useProjects } from "hooks";
import { capitalize } from "lodash";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { updateProject, UpdateType } from "services";
import { CounterType, IProjectStatus } from "types";
import { Counter } from "./components";

export const Project = () => {
  const { projectId } = useParams();
  const { project, getProject, patchProject } = useProjects();

  const handleCounters = useCallback(
    (updateType: UpdateType) => {
      if (!project || !projectId) {
        return null;
      }

      const value = updateProject(project, updateType);

      patchProject(value);
    },
    [project, projectId, patchProject]
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

  useEffect(() => {
    if (!project && projectId) {
      getProject(projectId);
    }
  }, [getProject, project, projectId]);

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
