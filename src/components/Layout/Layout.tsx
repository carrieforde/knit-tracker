import React from "react";
import { FlexLayout, GridLayout } from "./Layout.styles";

export type LayoutProps = {
  grid?: boolean;
  testId?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, grid, testId }) => {
  if (grid) {
    return <GridLayout data-testid={testId}>{children}</GridLayout>;
  }

  return <FlexLayout data-testid={testId}>{children}</FlexLayout>;
};
