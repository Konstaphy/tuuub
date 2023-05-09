import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  userId: null | string;
  username: null | string;
  setUser: (userId: string, token: string, username: string) => void;
  token: null | string;
  invalidate: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userId: null,
      token: null,
      username: null,
      setUser: (userId: string, token: string, username: string) =>
        set({ userId, token, username }),
      invalidate: () => set({ userId: null, token: null, username: null }),
    }),
    { name: "user" }
  )
);
