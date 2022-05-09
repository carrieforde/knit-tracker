import { alpha, Box, styled } from "@mui/material";
import { get } from "lodash";
import { BannerProps } from "./Banner";

export const StyledBanner = styled(Box)<BannerProps>(({ theme, variant }) => {
  const mainColor = get(
    theme.palette,
    `${variant}.main`,
    theme.palette[variant]
  );
  const textColor = get(theme.palette, `${variant}.dark`, theme.palette.text);

  return {
    alignItems: "center",
    backgroundColor: alpha(mainColor, 0.05),
    border: `1px solid ${mainColor}`,
    borderRadius: "4px",
    color: textColor,
    gap: theme.spacing(2),
    display: "flex",
    maxWidth: "calc(100% - 48px)",
    padding: theme.spacing(2),
    width: "750px",
  };
});
