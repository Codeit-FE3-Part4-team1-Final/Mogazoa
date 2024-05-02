import { create } from 'zustand';

interface SidebarState {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

// Sidebar의 보이기/숨기기 상태를 관리하는 스토어
const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarVisible: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
}));

export default useSidebarStore;
