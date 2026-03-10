import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/router/routes";

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        mt: 2,
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        showLabels={false}
      >
        <BottomNavigationAction
          icon={<HomeIcon />}
          onClick={() => navigate(ROUTES.HOME)}
        />

        <BottomNavigationAction
          icon={<AddBoxIcon />}
          onClick={() => navigate(ROUTES.CreatePost)}
        />

        <BottomNavigationAction
          icon={<PersonIcon />}
          onClick={() => navigate(ROUTES.Profile)}
        />
      </BottomNavigation>
    </Paper>
  );
}