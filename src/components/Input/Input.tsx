import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export type InputProps = TextFieldProps & {
  label: string;
  name: string;
  type?: "text" | "password" | "email";
};

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  ...props
}) => <TextField {...props} label={label} name={name} type={type} />;
