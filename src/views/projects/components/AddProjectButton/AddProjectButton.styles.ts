import { Fab, FabProps, styled } from "@mui/material";
import { ReactNode } from "react";

export const AddButton = styled(Fab)<
  FabProps & { component: ReactNode; to: string }
>(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(4),
  right: theme.spacing(4),
}));
