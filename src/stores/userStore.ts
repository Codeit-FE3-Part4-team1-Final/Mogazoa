import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean; // 사용자 로그인 상태를 나타냄
  setIsLoggedIn: (loggedIn: boolean) => void; // 사용자 로그인 상태를 설정하는 함수
  accessToken: string; // 사용자의 액세스 토큰
  setAccessToken: (token: string) => void; // 사용자의 액세스 토큰을 설정하는 함수
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn: boolean) => set(() => ({ isLoggedIn: loggedIn })),
  accessToken: '',
  setAccessToken: (token: string) => set(() => ({ accessToken: token })),
}));

export default useAuthStore;
