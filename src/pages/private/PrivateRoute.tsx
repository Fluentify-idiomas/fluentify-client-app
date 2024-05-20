import { useAuthentication } from "@/services/auth/auth.hook";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthentication();

  const isAuth = isAuthenticated();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
