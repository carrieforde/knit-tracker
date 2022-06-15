import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { UpdateType } from "services";
import { TestProjectProvider } from "test-utilities/test-providers";
import { testCreateProject } from "test-utilities/test-utilities";
import { CounterType, IProject, IProjectStatus } from "types";
import { Project } from "./Project";

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
const updateProject = jest.fn();

const createWrapper = (wrapperProject: IProject | null = project) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <TestProjectProvider
        project={wrapperProject}
        updateProject={updateProject}
      >
        {children}
      </TestProjectProvider>
    );
  };

function renderProject(renderProject?: IProject | null) {
  const wrapper = createWrapper(renderProject);
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
  it("should not render if the project is null or undefined", () => {
    renderProject(null);
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
