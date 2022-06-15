import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";
import { capitalize } from "lodash";
import React from "react";
import { CounterType } from "types";

export type CounterProps = {
  disabled: boolean;
  value: number;
  type: CounterType;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const Counter: React.FC<CounterProps> = ({
  disabled,
  value,
  type,
  onDecrement,
  onIncrement,
}) => {
  const title = capitalize(type);

  return (
    <Box>
      <Typography>{title}</Typography>
      <IconButton
        disabled={disabled}
        onClick={onDecrement}
        data-testid={`${type}-decrement`}
      >
        <RemoveIcon />
      </IconButton>
      {value}
      <IconButton
        disabled={disabled}
        onClick={onIncrement}
        data-testid={`${type}-increment`}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};
