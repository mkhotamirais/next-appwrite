import { create } from "zustand";

type RedirectDialogState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useRedirectDialog = create<RedirectDialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
