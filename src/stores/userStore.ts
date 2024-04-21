import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  setLogin: (token: string) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken') ?? null;
  }

  return {
    isLoggedIn: !!token,
    accessToken: token,
    setLogin: (newToken: string) =>
      set(() => ({ isLoggedIn: true, accessToken: newToken })),
    setLogout: () => {
      localStorage.removeItem('accessToken');
      set(() => ({ isLoggedIn: false, accessToken: null }));
    },
  };
});

export default useAuthStore;
