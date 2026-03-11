import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Avatar
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../config/router/routes";
import { useCurrentUser } from "../../hooks/core/useCurrentUser";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useCurrentUser();

  const getValue = () => {
    if (location.pathname === ROUTES.HOME) return 0;
    if (location.pathname === ROUTES.CreatePost) return 1;
    if (location.pathname === ROUTES.Profile) return 2;
    return 0;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0
      }}
    >
      <BottomNavigation value={getValue()} showLabels={false}>
        <BottomNavigationAction
          icon={<HomeIcon />}
          onClick={() => navigate(ROUTES.HOME)}
        />

        <BottomNavigationAction
          icon={<AddBoxIcon />}
          onClick={() => navigate(ROUTES.CreatePost)}
        />

        <BottomNavigationAction
          icon={
            <Avatar src={user?.profileImg}
              sx={{ width: 24, height: 24 }}>
              {!user?.profileImg && <PersonIcon />}
            </Avatar>
          }
          onClick={() => navigate(ROUTES.Profile)}
        />
      </BottomNavigation>
    </Paper>
  );
}