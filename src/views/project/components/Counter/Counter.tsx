import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

export type CounterProps = {
  disabled: boolean;
  value: number;
  title: string;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const Counter: React.FC<CounterProps> = ({
  disabled,
  value,
  title,
  onDecrease,
  onIncrease,
}) => (
  <Box>
    <Typography>{title}</Typography>
    <IconButton disabled={disabled} onClick={onDecrease}>
      <RemoveIcon />
    </IconButton>
    {value}
    <IconButton disabled={disabled} onClick={onIncrease}>
      <AddIcon />
    </IconButton>
  </Box>
);
