import type { NavigateFunction } from "react-router-dom";
import { ROUTER_ROUTES } from "./constants/ROUTER_ROUTES";

export const onBack = (navigate: NavigateFunction) => {
  if (globalThis.history.length > 1) {
    navigate(-1);
  } else {
    navigate(ROUTER_ROUTES.LANDING);
  }
};
