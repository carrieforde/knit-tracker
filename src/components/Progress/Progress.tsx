import React from "react";
import {
  ProgressBar,
  ProgressContainer,
  ProgressValue,
} from "./Progress.styles";

export type ProgressProps = {
  progress: number;
};

export const Progress: React.FC<ProgressProps> = ({ progress }) => (
  <ProgressContainer>
    <ProgressBar variant="determinate" value={progress} />
    <ProgressValue variant="body2" color="text.secondary">
      {Math.round(progress)}%
    </ProgressValue>
  </ProgressContainer>
);
