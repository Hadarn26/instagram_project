import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import type { JSX } from "react";
import {
  containerStyles,
  leftIconContainerStyles,
  titleStyles,
  rightSpacerStyles,
} from "./HeaderStyle";

type THeaderProps = {
  title: string;
  leftIcon?: ReactNode;
};

export const Header = ({ title, leftIcon }: THeaderProps): JSX.Element => {
  return (
    <Box sx={containerStyles}>
      <Box sx={leftIconContainerStyles}>{leftIcon}</Box>

      <Typography sx={titleStyles}>{title}</Typography>

      <Box sx={rightSpacerStyles} />
    </Box>
  );
};
