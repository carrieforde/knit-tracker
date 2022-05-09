import { Chip, ChipProps } from "@mui/material";
import React from "react";
import { IProjectStatus } from "types";

export type StatusChipProps = {
  status: IProjectStatus;
};

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  let color: ChipProps["color"] = "default";

  if (status === IProjectStatus.complete) {
    color = "success";
  } else if (status === IProjectStatus.inProgress) {
    color = "info";
  }

  return (
    <Chip label={status} size="small" sx={{ flexShrink: 0 }} color={color} />
  );
};
