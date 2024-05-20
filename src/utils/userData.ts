import { userSessionStorageToken } from "@/services/auth/auth.provider";

export function getUserIdWhenLogged() {
  const userId = sessionStorage.getItem(userSessionStorageToken);

  return userId ?? null;
}