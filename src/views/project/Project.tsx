import { Typography } from "@mui/material";
import { Layout } from "components/Layout/Layout";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Project as IProject } from "types";
import { Counter } from "./components";

function findProject(projectId?: string) {
  const projects: IProject[] = JSON.parse(
    localStorage.getItem("projects") ?? ""
  );

  if (!projects.length || !projectId) {
    return null;
  }

  return projects.find(({ slug }) => slug === projectId);
}

type CountState = {
  currentRowCount: number;
  currentRepeatCount: number;
};

export const Project = () => {
  const { projectId } = useParams();

  const project = findProject(projectId);

  // Consider moving to a reducer.
  const [count, setCount] = useState<CountState>({
    currentRepeatCount: project?.currentRepeatCount ?? 0,
    currentRowCount: project?.currentRowCount ?? 0,
  });

  // Could move to dispatch
  // Needs to handle saving the increases & decreases
  const handleRowIncrease = () => {
    setCount((s) => ({ ...s, currentRowCount: s.currentRowCount + 1 }));

    if (
      parseInt(project?.maxRowCount as unknown as string) ===
        count.currentRowCount + 1 &&
      project?.rowRepeatLinked
    ) {
      setTimeout(() => {
        handleRepeatIncrease();
        setCount((s) => ({ ...s, currentRowCount: 0 }));
      }, 500);
    }
  };

  const handleRowDecrease = () =>
    setCount((s) => ({ ...s, currentRowCount: s.currentRowCount - 1 }));

  const handleRepeatIncrease = () =>
    setCount((s) => ({ ...s, currentRepeatCount: s.currentRepeatCount + 1 }));

  const handleRepeatDecrease = () =>
    setCount((s) => ({ ...s, currentRepeatCount: s.currentRepeatCount - 1 }));

  if (!project) {
    return null;
  }

  return (
    <Layout>
      <Typography>{project.name}</Typography>
      <Counter
        title="Rows"
        value={count.currentRowCount}
        onDecrease={handleRowDecrease}
        onIncrease={handleRowIncrease}
      />

      <Counter
        title="Repeats"
        value={count.currentRepeatCount}
        onDecrease={handleRepeatDecrease}
        onIncrease={handleRepeatIncrease}
      />
    </Layout>
  );
};
