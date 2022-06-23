import { useLayoutEffect, useState } from "react";
import { Reducer } from "redux";
import { store } from "../store/store";
import { getState, injectReducer, subscribe } from "../utilities/utilities";
import { IProject } from "types";

type ProjectsState = {
  projects: IProject[] | null;
  project: IProject | null;
};

const STORE_KEY = "projects";

export const initialProjectsState: ProjectsState = {
  projects: null,
  project: null,
};

const reducers: Record<string, Reducer> = {
  setProjects(state, payload) {
    return {
      ...state,
      projects: payload,
    };
  },
  resetProjects(state) {
    return {
      ...state,
      projects: null,
    };
  },
  setProject(state, payload) {
    return {
      ...state,
      project: payload,
    };
  },
  resetProject(state) {
    return {
      ...state,
      project: null,
    };
  },
};

injectReducer(STORE_KEY, initialProjectsState, reducers);

export const useProjectsState = () => {
  const [state, setState] = useState<ProjectsState>(
    getState(STORE_KEY) ?? initialProjectsState
  );

  useLayoutEffect(() => {
    subscribe(STORE_KEY, setState);

    return () => {
      setState(initialProjectsState);
    };
  }, [setState]);

  return state;
};

export function setProjects(payload: IProject[]) {
  store.dispatch({ type: "setProjects", payload });
}

export function resetProjects() {
  store.dispatch({ type: "resetProjects" });
}

export function setProject(payload: IProject) {
  store.dispatch({ type: "setProject", payload });
}

export function resetProject() {
  store.dispatch({ type: "resetProject" });
}
