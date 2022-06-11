import { useCallback, useEffect, useState } from "react";
import { database } from "services";
import { IProject } from "types";

export const useProjects = () => {
  const [project, setProject] = useState<IProject | null>(null);

  const getProject = useCallback(
    (slug: string) => database.getProject(slug, setProject),
    []
  );

  const patchProject = useCallback(
    (project: IProject) => {
      database.updateProject(project);
      getProject(project.slug);
    },
    [getProject]
  );

  const resetProject = useCallback(() => setProject(null), []);

  return {
    getProject,
    project,
    resetProject,
    patchProject,
  };
};
