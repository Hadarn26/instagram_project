import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Avatar
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { getNavigateValue } from "./NavigateValue";
import { paperStyles, avatarStyles } from "./BottomNavStyle";
import { bottomNavItems } from "./BottomNav.utils";
import { userAtom } from "../../../store/userAtom";
import { useAtomValue } from "jotai";

export const BottomNav = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return <HomeIcon />;
      case "create":
        return <AddBoxIcon />;
      case "profile":
        return (
          <Avatar src={user?.profileImg} sx={avatarStyles}>
            {!user?.profileImg && <PersonIcon />}
          </Avatar>
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={paperStyles}>
      <BottomNavigation value={getNavigateValue()} showLabels={false}>
        {bottomNavItems.map((item) => (
          <BottomNavigationAction
            key={item.route}
            icon={renderIcon(item.icon)}
            onClick={() => navigate(item.route)}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};