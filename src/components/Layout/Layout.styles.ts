import { styled } from "@mui/material";

export const SharedLayoutStyles = styled("main")(({ theme }) => ({
  padding: theme.spacing(3),
  position: "relative",
  width: "100%",
}));

export const GridLayout = styled(SharedLayoutStyles)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: `repeat(auto-fit, minmax(350px, auto))`,
  gridTemplateRows: "repeat(auto-fit, minmax(140px, auto))",
  justifyContent: "center",
}));

export const FlexLayout = styled(SharedLayoutStyles)({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh",
});
