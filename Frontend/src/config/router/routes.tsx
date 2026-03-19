import { RouteObject } from "react-router-dom";

export enum ROUTES {
  HOME = "/",
  CREATE_POST = "/create",
  PROFILE = "/profile"
}

export const routes: RouteObject[] = [
    {
    path: ROUTES.HOME,
    lazy: async () => {
      const module = await import("../../pages/home/Home");
      return { Component: module.Home };
    },
  },
  {
    path: ROUTES.CREATE_POST,
    lazy: async () => {
      const module = await import("../../pages/create/CreatePost");
      return { Component: module.CreatePost };
    },
  },
  {
    path: ROUTES.PROFILE,
    lazy: async () => {
      const module = await import("../../pages/profile/Profile");
      return { Component: module.Profile };
    },
  },
];
