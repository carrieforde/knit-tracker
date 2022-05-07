import { Box, Typography } from "@mui/material";
import { FormBody } from "components/FormBody/FormBody";
import React, { FormEvent, ReactNode } from "react";
import { StyledForm } from "./Form.styles";

export type FormProps = {
  title: string;
  children: ReactNode;
  actions: ReactNode;
  onSubmit: (e: FormEvent) => void;
};

export const Form: React.FC<FormProps> = ({
  title,
  children,
  actions,
  onSubmit,
}) => (
  <StyledForm
    component="form"
    onSubmit={onSubmit}
    sx={{ width: "650px", maxWidth: "100%", display: "flex" }}
  >
    <Typography component="h1" variant="h6" mb={1} textAlign="center">
      {title}
    </Typography>

    <FormBody>{children}</FormBody>

    <Box>{actions}</Box>
  </StyledForm>
);
