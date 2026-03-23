import { ROUTES } from "../../../config/router/routes";

export type TBottomNavItem = {
  route: ROUTES;
  icon: "home" | "create" | "profile";
};

export const bottomNavItems: TBottomNavItem[] = [
  {
    route: ROUTES.HOME,
    icon: "home",
  },
  {
    route: ROUTES.CREATE_POST,
    icon: "create",
  },
  {
    route: ROUTES.PROFILE,
    icon: "profile",
  },
];
