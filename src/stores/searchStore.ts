import { create } from 'zustand';

interface SearchStore {
  isSearchVisible: boolean;
  toggleSearch: () => void;
}

// 네비게이션 search 모바일 토글 상태 관리
const useSearchStore = create<SearchStore>((set) => ({
  isSearchVisible: false,
  toggleSearch: () =>
    set((state) => ({ isSearchVisible: !state.isSearchVisible })),
}));

export default useSearchStore;
