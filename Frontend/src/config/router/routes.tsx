import { RouteObject } from "react-router-dom";

export enum ROUTES {
  HOME = "/",
}

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    lazy: () => import("../../components/pages/home/Home"),
  },
];
