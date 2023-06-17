import { Header } from "../widgets/header/header";
import { Routes, Route, Navigate } from "react-router-dom";
import { PersonVideoPage } from "../pages/upload-video-page/person-video-page";
import { useEffect } from "react";
import { AuthenticationService } from "../features/auth/lib/authentication-service";
import { authTransport } from "../features/auth/api/auth-transport";
import { HomePage } from "../pages/home/home-page";
import {YandexSignIn} from "../pages/authentication/yandex-sign-in/yandex-sign-in";
import {SignIn} from "../pages/authentication/sign-in";
import {create} from "zustand";
import {persist} from "zustand/middleware";

type UserData = {
  id: string
  login: string
  client_id: string
  display_name: string
  real_name: string
  first_name: string
  last_name: string
  sex: string
  default_email: string
  birthday: string
  default_avatar_id: string
  is_avatar_empty: boolean
  default_phone: {
    id: number
    number: string
  }
}

type UserStore = {
  user: null | UserData
  token: null | string
  setUser: (user: UserData) => void
  setToken: (token: string | null) => void
  invalidate: () => void
}

export const useUserStore = create(
    persist<UserStore>(
        (set) => ({
          user: null,
          setUser: (user: UserData) => set({ user }),
          token: null,
          setToken: (token: string | null) => set({ token }),
          invalidate: () => set({ user: null, token: null }),
        }),
        { name: "234" },
    ),
)

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
          <Route path="/login" element={<YandexSignIn />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
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
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/person/:id" element={<PersonVideoPage />}></Route>
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </div>
  );
};
