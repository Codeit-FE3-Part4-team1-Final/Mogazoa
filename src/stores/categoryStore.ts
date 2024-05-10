import { create } from 'zustand';
import { Category } from '@/types/types';

interface SelectedCategoryStore {
  selectedCategory: Category | null;
  setSelectedCategory: (value: Category | null) => void;
}

// 선택 카테코리 벨류 상태 관리
const useSelectedCategoryStore = create<SelectedCategoryStore>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (value) => set({ selectedCategory: value }),
}));

export default useSelectedCategoryStore;
