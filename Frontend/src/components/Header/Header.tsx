import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        borderBottom: "1px solid #ddd",
        mb: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        sx={{
          fontFamily: "cursive",
          fontSize: "22px",
        }}
      >
        instagram
      </Typography>
    </Box>
  );
}