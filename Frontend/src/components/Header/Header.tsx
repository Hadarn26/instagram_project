import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type HeaderProps = {
  title: string;
  leftIcon?: ReactNode;
};

export default function Header({ title, leftIcon }: HeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: 56,
        backgroundColor: "#fff",
        px: 1,
        borderBottom: "1px solid #e9e9e9",
        boxShadow: "0 1px 0 rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          width: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {leftIcon}
      </Box>

      <Typography
        sx={{
          flex: 1,
          textAlign: "center",
          fontFamily: "'Grand Hotel', cursive",
          fontSize: 35,
          lineHeight: 1,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ width: 40 }} />
    </Box>
  );
}