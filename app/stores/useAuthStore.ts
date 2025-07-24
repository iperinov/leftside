import { create } from "zustand";

export interface AuthData {
  email: string;
}

interface AuthState {
  auth?: AuthData;
  login: (auth: AuthData) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  auth: undefined,
  login: (auth) => set({ auth }),
  logout: () => set({ auth: undefined }),
  isLoggedIn: () => get().auth !== undefined,
}));
