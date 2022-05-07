import { Typography } from "@mui/material";
import { Layout } from "components/Layout/Layout";
import { capitalize, noop } from "lodash";
import React, { useState } from "react";
import { useParams } from "react-router";
import { getProjectBySlug } from "services/localStorage/localStorage";
import { CounterType, Project as IProject } from "types";
import { Counter } from "./components";

type CountState = {
  currentRowCount: number;
  currentRepeatCount: number;
};

export const Project = () => {
  const { projectId } = useParams();

  const {
    name,
    counters: [rowCounter, repeatCounter, isLinked],
  } = getProjectBySlug(projectId);

  // Consider moving to a reducer.
  // const [count, setCount] = useState<CountState>({
  //   currentRepeatCount: project?.currentRepeatCount ?? 0,
  //   currentRowCount: project?.currentRowCount ?? 0,
  // });

  // // Could move to dispatch
  // // Needs to handle saving the increases & decreases
  // const handleRowIncrease = () => {
  //   setCount((s) => ({ ...s, currentRowCount: s.currentRowCount + 1 }));

  //   if (
  //     parseInt(project?.maxRowCount as unknown as string) ===
  //       count.currentRowCount + 1 &&
  //     project?.rowRepeatLinked
  //   ) {
  //     setTimeout(() => {
  //       handleRepeatIncrease();
  //       setCount((s) => ({ ...s, currentRowCount: 0 }));
  //     }, 500);
  //   }
  // };

  // const handleRowDecrease = () =>
  //   setCount((s) => ({ ...s, currentRowCount: s.currentRowCount - 1 }));

  // const handleRepeatIncrease = () =>
  //   setCount((s) => ({ ...s, currentRepeatCount: s.currentRepeatCount + 1 }));

  // const handleRepeatDecrease = () =>
  //   setCount((s) => ({ ...s, currentRepeatCount: s.currentRepeatCount - 1 }));

  if (!name || !rowCounter) {
    return null;
  }

  return (
    <Layout>
      <Typography>{name}</Typography>
      <Counter
        title={capitalize(CounterType.ROW)}
        value={rowCounter.currentCount}
        onDecrease={noop}
        onIncrease={noop}
      />

      <Counter
        title="Repeats"
        value={repeatCounter.currentCount}
        onDecrease={noop}
        onIncrease={noop}
      />
    </Layout>
  );
};
