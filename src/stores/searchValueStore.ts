import { create } from 'zustand';

interface SearchValueStore {
  inputValue: string;
  setInputValue: (value: string) => void;
}

// 네비게이션 search 인풋 벨류 상태 관리
const useSearchInputStore = create<SearchValueStore>((set) => ({
  inputValue: '',
  setInputValue: (value: string) => set(() => ({ inputValue: value })),
}));

export default useSearchInputStore;
