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
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
        px: 1
      }}
    >
      {/* left icon */}
      <Box
        sx={{
          width: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {leftIcon}
      </Box>

      {/* title */}
      <Typography
        sx={{
          flex: 1,
          textAlign: "center",
          fontFamily: "Grand Hotel, cursive",
          fontSize: 30
        }}
      >
        {title}
      </Typography>

      {/* spacer כדי לשמור על center */}
      <Box sx={{ width: 40 }} />
    </Box>
  );
}