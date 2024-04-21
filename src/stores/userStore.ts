import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  setLogin: (token: string) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem('accessToken');

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
