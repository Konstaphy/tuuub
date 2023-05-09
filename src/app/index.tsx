import { Header } from "../widgets/header/header";
import { Routes, Route, Navigate } from "react-router-dom";
import { PersonVideoPage } from "../pages/upload-video-page/person-video-page";
import { SignIn } from "../pages/authentication/sign-in/sign-in";
import { SignUp } from "../pages/authentication/sign-up/sign-up";
import { useUserStore } from "../entities/user/model/user";
import { useEffect } from "react";
import { AuthenticationService } from "../features/auth/lib/authentication-service";
import { authTransport } from "../features/auth/api/auth-transport";

export const App = () => {
  const { token, invalidate } = useUserStore();

  const authService = new AuthenticationService(authTransport);

  useEffect(() => {
    if (token) {
      authService.refresh().catch((e) => {
        invalidate();
        console.error(e);
      });
    }
  }, []);

  // unauthorized routes
  if (!token) {
    return (
      <div id="app-root">
        <Routes>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="*" element={<Navigate to="/sign-in" />}></Route>
        </Routes>
      </div>
    );
  }

  // authorized routes
  return (
    <div id="app-root">
      <Header />
      <Routes>
        <Route path="/" element={<div>content</div>}></Route>
        <Route path="/person/:id" element={<PersonVideoPage />}></Route>
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </div>
  );
};
