import { render, screen } from "@testing-library/react";
import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { CounterType, IProject, IProjectStatus } from "types";
import { Projects } from "./Projects";

const wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Projects", () => {
  it("should not render when there are no projects", () => {
    render(<Projects />, { wrapper });

    expect(screen.queryByTestId("projects")).not.toBeInTheDocument();
  });

  it("should not render when the project array is empty", () => {
    render(<Projects />, { wrapper });

    expect(screen.queryByTestId("projects")).not.toBeInTheDocument();
  });

  it("should render when projects exist", () => {
    // mockedUseProjects.mockReturnValue({
    //   projects: [
    //     {
    //       name: "my project",
    //       slug: "my-project",
    //       counters: [
    //         { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
    //         { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
    //         false,
    //       ],
    //       progress: 0,
    //       status: IProjectStatus.notStarted,
    //       timestamps: {
    //         added: null,
    //         started: null,
    //         updated: null,
    //         completed: null,
    //       },
    //     },
    //   ] as IProject[],
    // } as unknown as ReturnType<typeof useProjects>);

    render(<Projects />, { wrapper });

    expect(screen.getByTestId("projects")).toBeInTheDocument();
  });
});
