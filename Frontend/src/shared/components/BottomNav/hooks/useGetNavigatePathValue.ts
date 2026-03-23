import { useLocation } from "react-router-dom";
import { ROUTES } from "../../../../config/router/routes";

export const useGetNavigatePathValue = (): number => {
  const location = useLocation();

  switch (location.pathname) {
    case ROUTES.HOME:
      return 0;
    case ROUTES.CREATE_POST:
      return 1;
    case ROUTES.PROFILE:
      return 2;
    default:
      return 0;
  }
};
