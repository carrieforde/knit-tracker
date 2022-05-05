import { Box, styled } from "@mui/material";

export const FormBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));
