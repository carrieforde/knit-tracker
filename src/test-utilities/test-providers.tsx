import React, { useMemo } from "react";
import { UpdateType } from "services";
import { IProject } from "types";
import { ProjectContext, ProjectsContext } from "providers";

type TestProjectProviderProps = {
  project?: IProject | null;
  updateProject?: (project: IProject | null, updateType: UpdateType) => void;
};

export const TestProjectProvider: React.FC<TestProjectProviderProps> = ({
  children,
  project,
  updateProject,
}) => {
  const memoizedValues = useMemo(
    () => ({
      project: project ?? null,
      updateProject: updateProject ?? jest.fn(),
    }),
    [project, updateProject]
  );

  return (
    <ProjectContext.Provider value={memoizedValues}>
      {children}
    </ProjectContext.Provider>
  );
};

type TestProjectsProviderProps = {
  projects?: IProject[] | null;
};

export const TestProjectsProvider: React.FC<TestProjectsProviderProps> = ({
  children,
  projects,
}) => {
  const memoizedValues = useMemo(() => projects ?? null, [projects]);

  return (
    <ProjectsContext.Provider value={memoizedValues}>
      {children}
    </ProjectsContext.Provider>
  );
};
