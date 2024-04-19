import { createStore } from 'zustand/vanilla';

export type ModalState = {
  count: number;
};

export type ModalActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const initModalStore = (): ModalState => {
  return { count: new Date().getFullYear() };
};

export const defaultInitState: ModalState = {
  count: 0,
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }));
};
