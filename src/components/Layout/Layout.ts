import { styled } from "@mui/material";

export const Layout = styled("main")<{ grid?: boolean }>(({ theme, grid }) => {
  if (grid) {
    return {
      padding: theme.spacing(3),
      position: "relative",
      width: "100%",
      display: "grid",
      gap: theme.spacing(4),
      gridTemplateColumns: `repeat(auto-fit, minmax(350px, auto))`,
      gridTemplateRows: "repeat(auto-fit, minmax(140px, auto))",
      justifyContent: "center",
    };
  }

  return {
    minHeight: "100vh",
    padding: theme.spacing(3),
    position: "relative",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
});
