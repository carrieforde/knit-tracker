import { useCallback, useEffect, useState } from "react";
import { database } from "services";
import { IProject } from "types";

export const useProjects = () => {
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const [project, setProject] = useState<IProject | null>(null);

  const getProjects = useCallback(
    () => database.getAllProjects(setProjects),
    []
  );

  const getProject = useCallback(
    (slug: string) => database.getProject(slug, setProject),
    []
  );

  const updateProject = useCallback(
    (project: IProject) => {
      database.updateProject(project);
      getProject(project.slug);
    },
    [getProject]
  );

  const resetProject = useCallback(() => setProject(null), []);

  useEffect(() => {
    if (!projects || !projects.length) {
      getProjects();
    }
  }, [getProjects, projects]);

  return { projects, getProject, project, resetProject, updateProject };
};
