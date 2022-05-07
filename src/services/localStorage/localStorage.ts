import { Project } from "types";

const KEY = "projects";

export function getProjectsFromLocalStorage(): Project[] {
  return localStorage.getItem(KEY)
    ? JSON.parse(localStorage.getItem(KEY) ?? "")
    : [];
}

export function saveProjectToLocalStorage(project: Project) {
  const projects = getProjectsFromLocalStorage();

  localStorage.setItem(KEY, JSON.stringify([...projects, project]));
}

export function getProjectBySlug(projectSlug?: string): Project {
  const projects = getProjectsFromLocalStorage();

  if (!projectSlug || !projects.length) {
    return {} as Project;
  }

  return projects.find(({ slug }) => slug === projectSlug) ?? ({} as Project);
}
