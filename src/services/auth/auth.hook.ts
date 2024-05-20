import { useContext } from "react";
import { AuthenticationContext } from "./auth.context";

export const useAuthentication = () => useContext(AuthenticationContext);
