import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  userId: null | string;
  setUser: (userId: string, token: string) => void;
  token: null | string;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userId: null,
      token: null,
      setUser: (userId: string, token: string) => set({ userId, token }),
    }),
    { name: "user" }
  )
);
