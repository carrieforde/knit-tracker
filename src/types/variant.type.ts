import { Palette } from "@mui/material";

export type Variant = keyof Pick<
  Palette,
  "info" | "warning" | "error" | "success"
>;
