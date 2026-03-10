import { RouteObject } from "react-router-dom";

export enum ROUTES {
  HOME = "/",
  CreatePost = "/create",
  Profile = "/profile"
}

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    lazy: () => import("../../components/pages/home/Home"),
  },
  {
    path: ROUTES.CreatePost,
    lazy: () => import("../../components/pages/create/CreatePost"),
  },
  {
    path: ROUTES.Profile,
   // lazy: () => import("../../components/pages/profile/Profile"),
  },
];
