import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Exercise } from "./pages/private/Exercise";
import { ExerciseProvider } from "./pages/private/Exercise/exercise.provider";
import { Home } from "./pages/private/Home";
import { Level } from "./pages/private/Level";
import { Module } from "./pages/private/Module";
import PrivateRoute from "./pages/private/PrivateRoute";
import { LoginPage } from "./pages/public/Auth/LoginPage";
import { RegisterPage } from "./pages/public/Auth/RegisterPage";
import LandingPage from "./pages/public/LandingPage";
import { ChangeRecoveryPassword } from "./pages/public/PasswordRecovery/ChangeRecoveryPassword";
import { UserRecoveryPassword } from "./pages/public/PasswordRecovery/UserRecoveryPassword";
import { VerifyPasswordRecovery } from "./pages/public/PasswordRecovery/VerifyRecoveryPassword";
import { AuthenticationProvider } from "./services/auth/auth.provider";
import { AppRouterProvider } from "./services/router/router.provider";


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
  {
    path: "/password-recovery",
    element: <UserRecoveryPassword />,
  },
  {
    path: '/verify-password-recovery/:email',
    element: <VerifyPasswordRecovery />
  },
  {
    path: '/change-password/:email/:verifyCode',
    element: <ChangeRecoveryPassword />
  }
];

const privateRouters = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/level/:id',
    element: <Level />
  },
  {
    path: '/module/:id',
    element: <Module />
  },
  {
    path: '/exercises/:module_id',
    element: (
      <ExerciseProvider>
        <Exercise />
      </ExerciseProvider>
    )
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
