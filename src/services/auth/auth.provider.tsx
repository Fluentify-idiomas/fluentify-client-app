import { ReactNode } from "react";
import { useAppRouter } from "../router/router.hook";
import { AuthenticationContext } from "./auth.context";

interface Props {
  children: ReactNode;
}

export const userSessionStorageToken = 'auth-fluentify';

export function AuthenticationProvider({ children }: Props) {

  const { navigateTo } =  useAppRouter();

  async function handleSignIn(userId: string) {
    sessionStorage.setItem(userSessionStorageToken, userId);
  }

  function handleSignOut() {
    sessionStorage.removeItem(userSessionStorageToken);
    navigateTo('/login')
  }

  function isAuthenticated() {
    const auth = sessionStorage.getItem(userSessionStorageToken);

    if (auth) return true;

    return false;
  }

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, handleSignIn, handleSignOut }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
