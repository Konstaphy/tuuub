import { Header } from "../widgets/header/header";
import { Routes, Route, Navigate } from "react-router-dom";
import { PersonVideoPage } from "../pages/upload-video-page/person-video-page";
import { useEffect } from "react";
import { authTransport } from "../features/auth/api/auth-transport";
import { HomePage } from "../pages/home/home-page";
import { YandexSignIn } from "../pages/authentication/yandex-sign-in/yandex-sign-in";
import { SignIn } from "../pages/authentication/sign-in";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createLogger } from "vite";
import axios from "axios";
import { Player } from "../widgets/player/player";
import { VideoPage } from "../pages/video/video";

type UserData = {
  id: string;
  login: string;
  client_id: string;
  display_name: string;
  real_name: string;
  first_name: string;
  last_name: string;
  sex: string;
  default_email: string;
  birthday: string;
  default_avatar_id: string;
  is_avatar_empty: boolean;
  default_phone: {
    id: number;
    number: string;
  };
};

export type UserStore = {
  user: null | UserData;
  token: null | string;
  setUser: (user: UserData) => void;
  setToken: (token: string | null) => void;
  invalidate: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user: UserData) => set({ user }),
      token: null,
      setToken: (token: string | null) => set({ token }),
      invalidate: () => set({ user: null, token: null }),
    }),
    { name: "user" }
  )
);

export const App = () => {
  const { token, user, setUser, invalidate } = useUserStore();

  useEffect(() => {
    if (token) {
      // authService.refresh().catch((e) => {
      //   invalidate();
      //   console.error(e);
      // });
    }
  }, []);
  useEffect(() => {
    if (!user && token) {
      axios
        .get<UserData & { error: string }>(
          `http://95.182.121.35:8080/users/user/${token}`
        )
        .then((d) => {
          if (d.data.error) {
            throw new Error("Ошибка при запросе пользователя");
          }
          setUser(d.data);
        })
        .catch((e) => console.error(e));
    }
  }, [token, user, setUser]);

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
        <Route path="/video/:id" element={<VideoPage />}></Route>
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </div>
  );
};
