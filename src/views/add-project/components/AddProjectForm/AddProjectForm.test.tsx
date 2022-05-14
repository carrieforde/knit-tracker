import React from "react";
import { render, screen } from "@testing-library/react";
import { CounterType, IProject, IProjectStatus } from "types";
import { AddProjectForm } from "./AddProjectForm";
import { useNavigate } from "react-router";
import { database } from "services";
import userEvent from "@testing-library/user-event";

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("services", () => ({
  ...jest.requireActual("services"),
  database: {
    postProject: jest.fn(),
  },
}));

const mockedUseNavigate = jest.mocked(useNavigate);
const mockedDatabase = jest.mocked(database);

describe("AddProjectForm", () => {
  const date = new Date(2022, 4, 1).toISOString();

  beforeEach(() => {
    mockedUseNavigate.mockReturnValue(jest.fn());
  });

  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2022, 4, 1));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should submit the form with the correct values", () => {
    const payload: IProject = {
      name: "my project",
      slug: "my-project",
      timestamps: {
        added: date,
        started: null,
        updated: null,
        completed: null,
      },
      counters: [
        { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
        false,
      ],
      progress: 0,
      status: IProjectStatus.notStarted,
    };

    render(<AddProjectForm />);

    const projectName = screen.getByRole("textbox", { name: "Project Name" });
    const maxRowCount = screen.getByRole("spinbutton", {
      name: "Max Row Count",
    });

    userEvent.clear(projectName);
    userEvent.type(projectName, "my project");

    userEvent.clear(maxRowCount);
    userEvent.type(maxRowCount, "5");

    userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockedDatabase.postProject).toHaveBeenCalledWith(payload);
    // expect(mockedUseNavigate).toHaveBeenCalledWith("/projects");
  });
});
