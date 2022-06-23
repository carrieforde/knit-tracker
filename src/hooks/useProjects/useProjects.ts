import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { database, updateProject, UpdateType } from "services";
import { setProject, useProjectsState } from "store";

export const useProjects = () => {
  const navigate = useNavigate();
  const { project } = useProjectsState();

  const handleAddProjectRedirect = useCallback(
    (projectsLength?: number) => {
      if (!projectsLength || projectsLength <= 0) {
        navigate("/add-project");
      }
    },
    [navigate]
  );

  const handleCounters = useCallback(
    (updateType: UpdateType) => {
      if (!project) {
        return;
      }

      const value = updateProject(project, updateType);

      database.updateProject(value, setProject);
    },
    [project]
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
    handleAddProjectRedirect,
  };
};
