import {
  initialProjectsState,
  resetProject,
  resetProjects,
  setProject,
  setProjects,
  useProjectsState,
} from "./projects";
import { renderHook } from "@testing-library/react-hooks";
import { testCreateProject } from "test-utilities/test-utilities";
import { store } from "../store/store";

jest.mock("../store/store");

const mockedStore = jest.mocked(store);

export function getStateMock(state: Record<string, any>) {
  return mockedStore.getState.mockReturnValue(state);
}

describe("projects", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("useProjectsState", () => {
    it("should return the default state", () => {
      getStateMock(initialProjectsState);

      const { result } = renderHook(() => useProjectsState());

      expect(result.current).toMatchObject(initialProjectsState);
    });

    it("should return the current state", () => {
      const project = testCreateProject({
        name: "my project",
        slug: "my-project",
      });
      const state = {
        projects: [project],
        project,
      };

      getStateMock({ projects: state });

      const { result } = renderHook(() => useProjectsState());

      expect(result.current).toMatchObject(state);
    });
  });

  describe("projects dispatches", () => {
    const project = testCreateProject({ name: "my project" });
    const projects = [project];

    describe("setProjects", () => {
      it("should dispatch a 'setProjects' payload", () => {
        setProjects(projects);

        expect(store.dispatch).toHaveBeenCalledWith({
          type: "setProjects",
          payload: projects,
        });
      });
    });

    describe("resetProjects", () => {
      it("should dispatch a 'resetProjects' type", () => {
        resetProjects();

        expect(store.dispatch).toHaveBeenLastCalledWith({
          type: "resetProjects",
        });
      });
    });

    describe("setProject", () => {
      it("should dispatch a 'setProject' payload", () => {
        setProject(project);

        expect(store.dispatch).toHaveBeenCalledWith({
          type: "setProject",
          payload: project,
        });
      });
    });

    describe("resetProject", () => {
      it("should dispatch a 'resetProject' type", () => {
        resetProject();

        expect(store.dispatch).toHaveBeenCalledWith({
          type: "resetProject",
        });
      });
    });
  });
});
