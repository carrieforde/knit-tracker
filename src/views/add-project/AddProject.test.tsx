import { render, screen } from "@testing-library/react";
import React from "react";
import { AddProject } from "./AddProject";

jest.mock("./components", () => ({
  AddProjectForm: () => <div data-testid="addProjectForm" />,
}));

describe("AddProject", () => {
  it("should render the add project content", () => {
    render(<AddProject />);
    expect(screen.getByTestId("addProjectForm")).toBeInTheDocument();
  });
});
