import { IProject } from "types";

export function testCreateProject(args?: Partial<IProject>): IProject {
  return { ...args } as IProject;
}
