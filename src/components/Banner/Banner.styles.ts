import { alpha, Box, styled } from "@mui/material";
import { BannerProps } from "./Banner";

export const StyledBanner = styled(Box)<BannerProps>(({ theme, variant }) => ({
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
