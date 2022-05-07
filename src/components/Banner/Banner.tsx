import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { BoxProps } from "@mui/material";
import React, { ReactNode } from "react";
import { Variant } from "types";
import { StyledBanner } from "./Banner.styles";

export type BannerProps = BoxProps & {
  variant: Variant;
  children: ReactNode;
};

export const Banner: React.FC<BannerProps> = ({
  children,
  variant,
  ...props
}) => {
  if (!variant) {
    return null;
  }

  let icon = null;

  switch (variant) {
    case "error":
      icon = <ErrorIcon data-testid="bannerErrorIcon" />;
      break;

    case "info":
      icon = <InfoIcon data-testid="bannerInfoIcon" />;
      break;

    case "success":
      icon = <CheckCircleIcon data-testid="bannerSuccessIcon" />;
      break;

    case "warning":
      icon = <WarningIcon data-testid="bannerWarningIcon" />;
      break;

    default:
      break;
  }

  return (
    <StyledBanner {...props} variant={variant}>
      {icon}
      {children}
    </StyledBanner>
  );
};
