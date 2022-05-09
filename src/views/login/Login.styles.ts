import { Box, styled } from "@mui/material";

export const LoginLayout = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  padding: theme.spacing(3),
  justifyContent: "center",
  position: "relative",
  width: "100%",
}));
