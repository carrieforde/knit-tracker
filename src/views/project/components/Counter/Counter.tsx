import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

export type CounterProps = {
  value: number;
  title: string;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const Counter: React.FC<CounterProps> = ({
  value,
  title,
  onDecrease,
  onIncrease,
}) => (
  <Box>
    <Typography>{title}</Typography>
    <IconButton onClick={onDecrease}>
      <RemoveIcon />
    </IconButton>
    {value}
    <IconButton onClick={onIncrease}>
      <AddIcon />
    </IconButton>
  </Box>
);
