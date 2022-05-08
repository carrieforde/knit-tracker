import { Typography } from "@mui/material";
import { Layout } from "components/Layout/Layout";
import { useProjects } from "hooks/useProjects/useProjects";
import { capitalize } from "lodash";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { CounterType } from "types";
import {
  decreaseRepeat,
  decreaseRow,
  increaseRepeat,
  increaseRow,
} from "utilities/counters/counters";
import { Counter } from "./components";

type CounterHandler =
  | "increaseRow"
  | "decreaseRow"
  | "increaseRepeat"
  | "decreaseRepeat";

export const Project = () => {
  const { projectId } = useParams();
  const { project, getProject, updateProject } = useProjects();

  const handleCounters = useCallback(
    (handlerType: CounterHandler) => {
      if (!project || !projectId) {
        return null;
      }

      let value = project;

      switch (handlerType) {
        case "increaseRow":
          value = increaseRow(project);
          break;
        case "decreaseRow":
          value = decreaseRow(project);
          break;
        case "increaseRepeat":
          value = increaseRepeat(project);
          break;
        case "decreaseRepeat":
          value = decreaseRepeat(project);
          break;
        default:
          break;
      }

      updateProject(value);
    },
    [project, projectId, updateProject]
  );

  const handleIncreaseRow = useCallback(
    () => handleCounters("increaseRow"),
    [handleCounters]
  );

  const handleDecreaseRow = useCallback(
    () => handleCounters("decreaseRow"),
    [handleCounters]
  );

  const handleIncreaseRepeat = useCallback(
    () => handleCounters("increaseRepeat"),
    [handleCounters]
  );

  const handleDecreaseRepeat = useCallback(
    () => handleCounters("decreaseRepeat"),
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
  } = project;

  return (
    <Layout>
      <Typography>{name}</Typography>
      <Counter
        title={capitalize(CounterType.ROW)}
        value={rowCounter.currentCount}
        onDecrease={handleDecreaseRow}
        onIncrease={handleIncreaseRow}
      />

      <Counter
        title="Repeats"
        value={repeatCounter.currentCount}
        onDecrease={handleDecreaseRepeat}
        onIncrease={handleIncreaseRepeat}
      />
    </Layout>
  );
};
