import { Box, LinearProgress, styled, Typography } from "@mui/material";

export const ProgressContainer = styled(Box)({
  alignItems: "center",
  display: "flex",
});

export const ProgressBar = styled(LinearProgress)({
  flexBasis: "100%",
});

export const ProgressValue = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  marginLeft: theme.spacing(1),
}));
