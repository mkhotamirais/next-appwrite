import { account } from "@/appwrite/config";
import { create } from "zustand";

interface User {
  email?: string;
}

interface AuthState {
  user: User | null;
  setUser: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  session: null,

  setUser: async () => {
    await account
      .get()
      .then((user) => {
        set({ user });
      })
      .catch(() => {
        set({ user: null });
      });
  },
}));
