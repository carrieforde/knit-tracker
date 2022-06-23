import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useProjectsStateMock } from "test-utilities/test-state";
import { testCreateProject } from "test-utilities/test-utilities";
import { CounterType, IProjectStatus } from "types";
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

const wrapper: React.FC = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

function renderProjects() {
  render(<Projects />, { wrapper });
}

describe("Projects", () => {
  beforeEach(() => {
    useProjectsStateMock({ projects });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not render when there are no projects", () => {
    useProjectsStateMock();
    renderProjects();
    expect(screen.queryByTestId("projects")).not.toBeInTheDocument();
  });

  it("should not render when the project array is empty", () => {
    useProjectsStateMock({ projects: [] });
    renderProjects();
    expect(screen.queryByTestId("projects")).not.toBeInTheDocument();
  });

  it("should render when projects exist", () => {
    renderProjects();
    expect(screen.getByTestId("projects")).toBeInTheDocument();
  });
});
