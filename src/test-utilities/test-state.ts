import { useProjectsState } from "store";
import { IProject } from "types";

jest.mock("store", () => ({
  ...jest.requireActual("store"),
  useProjectsState: jest.fn(() => ({
    projects: null,
    project: null,
  })),
}));

const mockedUseProjectsState = jest.mocked(useProjectsState);

type UseProjectsStateArgs = {
  projects?: IProject[];
  project?: IProject;
};

export function useProjectsStateMock(args?: UseProjectsStateArgs) {
  return mockedUseProjectsState.mockReturnValue({
    project: null,
    projects: null,
    ...args,
  });
}
