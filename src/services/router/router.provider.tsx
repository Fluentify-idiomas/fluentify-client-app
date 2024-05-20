import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppRouterContext } from "./router.context";

interface Props {
  children: ReactNode;
}

export function AppRouterProvider({ children }: Props) {
  const navigate = useNavigate();

  function navigateTo(path: string): void {
    navigate(path);
  }

  return (
    <AppRouterContext.Provider value={{ navigateTo }}>
      {children}
    </AppRouterContext.Provider>
  )
}