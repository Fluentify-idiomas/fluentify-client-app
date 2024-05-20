import { createContext } from "react";

type RouterContextData = {
  navigateTo(path: string): void;
};

export const AppRouterContext = createContext({} as RouterContextData);
