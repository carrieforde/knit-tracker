import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { updateProject, UpdateType } from "services";
import { useProjectsStateMock } from "test-utilities/test-state";
import { testCreateProject } from "test-utilities/test-utilities";
import { CounterType, IProjectStatus } from "types";
import { Project } from "./Project";

jest.mock("services", () => ({
  ...jest.requireActual("services"),
  updateProject: jest.fn(),
}));

const project = testCreateProject({
  name: "A project",
  counters: [
    { currentCount: 0, maxCount: 5, type: CounterType.ROW },
    { type: CounterType.REPEAT, currentCount: 0, maxCount: 5 },
    false,
  ],
  timestamps: {
    completed: null,
    started: null,
    updated: null,
    added: null,
  },
  status: IProjectStatus.inProgress,
});

const wrapper: React.FC = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

function renderProject() {
  render(<Project />, { wrapper });
}

function getElements() {
  return {
    incrementRowButton: screen.queryByTestId(`${CounterType.ROW}-increment`),
    decrementRowButton: screen.queryByTestId(`${CounterType.ROW}-decrement`),
    decrementRepeatButton: screen.queryByTestId(
      `${CounterType.REPEAT}-decrement`
    ),
    incrementRepeatButton: screen.queryByTestId(
      `${CounterType.REPEAT}-increment`
    ),
  };
}

describe("Project", () => {
  beforeEach(() => {
    useProjectsStateMock({ project });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not render if the project is null or undefined", () => {
    useProjectsStateMock();
    renderProject();
    const { incrementRowButton } = getElements();

    expect(incrementRowButton).not.toBeInTheDocument();
  });

  it("should handle incrementing a row", () => {
    renderProject();
    const { incrementRowButton } = getElements();

    userEvent.click(incrementRowButton as HTMLElement);

    expect(updateProject).toHaveBeenCalledWith(
      ...[project, UpdateType.incrementRow]
    );
  });

  it("should handle decrementing a row", () => {
    renderProject();
    const { decrementRowButton } = getElements();

    userEvent.click(decrementRowButton as HTMLElement);

    expect(updateProject).toHaveBeenCalledWith(
      ...[project, UpdateType.decrementRow]
    );
  });

  it("should handle incrementing a repeat", () => {
    renderProject();
    const { incrementRepeatButton } = getElements();

    userEvent.click(incrementRepeatButton as HTMLElement);

    expect(updateProject).toHaveBeenCalledWith(
      ...[project, UpdateType.incrementRepeat]
    );
  });

  it("should handle decrementing a repeat", () => {
    renderProject();
    const { decrementRepeatButton } = getElements();

    userEvent.click(decrementRepeatButton as HTMLElement);

    expect(updateProject).toHaveBeenCalledWith(
      ...[project, UpdateType.decrementRepeat]
    );
  });
});
