import { useProjectContext } from "providers";
import { useCallback } from "react";
import { UpdateType } from "services";

export const useProjects = () => {
  const { project, updateProject } = useProjectContext();

  const handleCounters = useCallback(
    (updateType: UpdateType) => {
      if (!project) {
        return;
      }

      updateProject(project, updateType);
    },
    [project, updateProject]
  );

  const handleIncrementRow = useCallback(
    () => handleCounters(UpdateType.incrementRow),
    [handleCounters]
  );

  const handleDecrementRow = useCallback(
    () => handleCounters(UpdateType.decrementRow),
    [handleCounters]
  );

  const handleIncrementRepeat = useCallback(
    () => handleCounters(UpdateType.incrementRepeat),
    [handleCounters]
  );

  const handleDecrementRepeat = useCallback(
    () => handleCounters(UpdateType.decrementRepeat),
    [handleCounters]
  );

  return {
    handleIncrementRow,
    handleDecrementRow,
    handleIncrementRepeat,
    handleDecrementRepeat,
  };
};
