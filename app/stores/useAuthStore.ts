import { create } from "zustand";

export interface AuthData {
  token: string;
  email: string;
}

interface AuthState {
  auth: AuthData | null;
  setAuth: (auth: AuthData) => void;
  clearAuth: () => void;
  loadAuth: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: null,
  setAuth: (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    set({ auth });
  },
  clearAuth: () => {
    localStorage.removeItem("auth");
    set({ auth: null });
  },
  loadAuth: () => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed: AuthData = JSON.parse(stored);
        if (parsed.token && parsed.email) {
          set({ auth: parsed });
          return true;
        }
      } catch (e) {
        console.warn("Failed to parse auth from localStorage", e);
      }
    }
    return false;
  },
}));
