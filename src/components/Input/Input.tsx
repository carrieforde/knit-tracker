import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export type InputProps = TextFieldProps & {
  label: string;
  name: string;
  type?: HTMLInputElement["type"];
};

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  variant = "outlined",
  ...props
}) => (
  <TextField
    {...props}
    variant={variant}
    label={label}
    name={name}
    type={type}
  />
);
