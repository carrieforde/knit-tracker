import { render, screen } from "@testing-library/react";
import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { TestProjectsProvider } from "test-utilities/test-providers";
import { testCreateProject } from "test-utilities/test-utilities";
import { CounterType, IProject, IProjectStatus } from "types";
import { Projects } from "./Projects";

const projects = [
  testCreateProject({
    name: "my project",
    slug: "my-project",
    counters: [
      { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
      { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
      false,
    ],
    progress: 0,
    status: IProjectStatus.notStarted,
    timestamps: {
      added: null,
      started: null,
      updated: null,
      completed: null,
    },
  }),
];

const createWrapper = (wrapperProjects: IProject[] | null = projects) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <BrowserRouter>
        <TestProjectsProvider projects={wrapperProjects}>
          {children}
        </TestProjectsProvider>
      </BrowserRouter>
    );
  };

function renderProjects(projectsData?: IProject[] | null) {
  const wrapper = createWrapper(projectsData);
  render(<Projects />, { wrapper });
}

describe("Projects", () => {
  it("should not render when there are no projects", () => {
    renderProjects(null);
    expect(screen.queryByTestId("projects")).not.toBeInTheDocument();
  });

  it("should not render when the project array is empty", () => {
    renderProjects([]);
    expect(screen.queryByTestId("projects")).not.toBeInTheDocument();
  });

  it("should render when projects exist", () => {
    renderProjects();
    expect(screen.getByTestId("projects")).toBeInTheDocument();
  });
});
