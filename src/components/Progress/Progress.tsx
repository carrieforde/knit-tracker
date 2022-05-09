import { LinearProgress, Typography, Box } from "@mui/material";
import React from "react";

export type ProgressProps = {
  progress: number;
};

export const Progress: React.FC<ProgressProps> = ({ progress }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{ flexBasis: "100%" }}
    />
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ flexShrink: 0 }}
      ml={1}
    >
      {Math.round(progress)}%
    </Typography>
  </Box>
);
