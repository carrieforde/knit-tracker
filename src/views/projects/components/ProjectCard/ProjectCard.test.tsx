import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { testCreateProject } from "test-utilities/test-utilities";
import { IProject, IProjectTimestamps } from "types";
import { ProjectCard } from "./ProjectCard";

const wrapper: React.FC = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

function renderProjectCard(project: IProject) {
  render(<ProjectCard {...project} />, { wrapper });
}

describe("ProjectCard", () => {
  it("should not render any timestamps", () => {
    const project = testCreateProject();

    renderProjectCard(project);
    expect(
      screen.queryByText("started", { exact: false })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("completed", { exact: false })
    ).not.toBeInTheDocument();
  });

  it("should render the started timestamp, but not the completed timestamp", () => {
    const project = testCreateProject({
      timestamps: { started: new Date().toISOString() } as IProjectTimestamps,
    });

    renderProjectCard(project);
    expect(screen.getByText("started", { exact: false })).toBeInTheDocument();
    expect(
      screen.queryByText("completed", { exact: false })
    ).not.toBeInTheDocument();
  });

  it("should render the started completed timestamps", () => {
    const project = testCreateProject({
      timestamps: {
        started: new Date().toISOString(),
        completed: new Date().toISOString(),
      } as IProjectTimestamps,
    });

    renderProjectCard(project);
    expect(screen.getByText("started", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("completed", { exact: false })).toBeInTheDocument();
  });
});
