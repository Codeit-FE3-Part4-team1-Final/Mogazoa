import { create } from 'zustand';

interface SidebarState {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

// 네비게이션 사이드바 메뉴 토글 상태 관리
const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarVisible: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
}));

export default useSidebarStore;
