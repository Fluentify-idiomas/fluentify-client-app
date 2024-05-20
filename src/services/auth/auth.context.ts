import { createContext } from "react";

type AuthContextData = {
  isAuthenticated(): boolean
  handleSignIn(userId: string): Promise<void>,
  handleSignOut(): void
}

export const AuthenticationContext = createContext({} as AuthContextData);