import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  setLogin: (token: string) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  setLogin: (token: string) =>
    set(() => ({ isLoggedIn: true, accessToken: token })),
  setLogout: () => set(() => ({ isLoggedIn: false, accessToken: null })),
}));

export default useAuthStore;
