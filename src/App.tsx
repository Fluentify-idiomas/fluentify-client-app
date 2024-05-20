import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/private/Home";
import PrivateRoute from "./pages/private/PrivateRoute";
import { LoginPage } from "./pages/public/Auth/LoginPage";
import { RegisterPage } from "./pages/public/Auth/RegisterPage";
import LandingPage from "./pages/public/LandingPage";
import { AuthenticationProvider } from "./services/auth/auth.provider";
import { AppRouterProvider } from "./services/router/router.provider";
import { Level } from "./pages/private/Level";

const publicRouters = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

const privateRouters = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/level/:id',
    element: <Level />
  }
]

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouterProvider>
          <AuthenticationProvider>
            <Routes>
              {publicRouters.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
              {privateRouters.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<PrivateRoute />}
                >
                  <Route path={route.path} element={route.element} />
                </Route>
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthenticationProvider>
        </AppRouterProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
