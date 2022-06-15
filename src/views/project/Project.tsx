import { Typography } from "@mui/material";
import { Layout } from "components/Layout/Layout";
import { useProjects } from "hooks";
import { isEmpty, isNull } from "lodash";
import { useProjectContext } from "providers";
import { CounterType, IProjectStatus } from "types";
import { Counter } from "./components";

export const Project = () => {
  const {
    handleDecrementRepeat,
    handleDecrementRow,
    handleIncrementRepeat,
    handleIncrementRow,
  } = useProjects();
  const { project } = useProjectContext();

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
        type={CounterType.ROW}
        value={rowCounter.currentCount}
        onDecrement={handleDecrementRow}
        onIncrement={handleIncrementRow}
      />

      <Counter
        disabled={isDisabled}
        type={CounterType.REPEAT}
        value={repeatCounter.currentCount}
        onDecrement={handleDecrementRepeat}
        onIncrement={handleIncrementRepeat}
      />
    </Layout>
  );
};
