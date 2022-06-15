import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { FullScreenWrapper } from "./FullScreenLoader.styles";

export const FullScreenLoader: React.FC = () => (
  <FullScreenWrapper>
    <CircularProgress />
  </FullScreenWrapper>
);
