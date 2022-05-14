import { render, screen } from "@testing-library/react";
import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AddProjectButton } from "./AddProjectButton";

const wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("AddProjecButton", () => {
  it("should render the button", () => {
    render(<AddProjectButton />, { wrapper });

    expect(screen.getByRole("link")).toHaveAttribute(
      "aria-label",
      "Add Project"
    );
  });
});
