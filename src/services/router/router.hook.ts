import { useContext } from "react";
import { AppRouterContext } from "./router.context";

export const useAppRouter = () => useContext(AppRouterContext);
