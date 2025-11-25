import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamOnTheme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("streamOnTheme", theme);
    set({ theme });
  },
}));
