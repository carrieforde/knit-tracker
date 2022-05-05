import { CheckCircle, Error, Info } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import { alpha, Box, BoxProps, Palette, styled } from "@mui/material";
import React, { ReactNode } from "react";

type Variant = keyof Pick<Palette, "info" | "warning" | "error" | "success">;

export type BannerProps = BoxProps & {
  variant: Variant;
  children: ReactNode;
};

const StyledBanner = styled(Box)<BannerProps>(({ theme, variant }) => ({
  alignItems: "center",
  backgroundColor: alpha(theme.palette[variant].main, 0.05),
  border: `1px solid ${theme.palette[variant].main}`,
  borderRadius: "4px",
  color: theme.palette[variant].dark,
  gap: theme.spacing(2),
  display: "flex",
  maxWidth: "calc(100% - 48px)",
  padding: theme.spacing(2),
  width: "750px",
}));

export const Banner: React.FC<BannerProps> = ({
  children,
  variant,
  ...props
}) => {
  let icon = null;

  switch (variant) {
    case "error":
      icon = <Error />;
      break;

    case "info":
      icon = <Info />;
      break;

    case "success":
      icon = <CheckCircle />;
      break;

    case "warning":
      icon = <WarningIcon />;
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
