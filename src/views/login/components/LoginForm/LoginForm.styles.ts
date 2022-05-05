import { Paper, PaperProps, styled } from "@mui/material";

export const FormContainer = styled(Paper)<PaperProps & { component: string }>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    maxWidth: "100%",
    width: "375px",
  })
);
