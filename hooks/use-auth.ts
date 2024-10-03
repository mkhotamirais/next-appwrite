// import { account } from "@/appwrite/config";
import { create } from "zustand";

interface User {
  email?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  // session: null,
  setUser: (user) => set({ user }),

  // setUser: async () => {
  //   await account
  //     .get()
  //     .then((user) => {
  //       set({ user });
  //     })
  //     .catch(() => {
  //       set({ user: null });
  //     });
  // },
}));
