import { createStore } from 'zustand/vanilla';

export type ModalState = {
  isOpened: boolean;
};

export type ModalActions = {
  toggleModal: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const initModalStore = (): ModalState => {
  return { isOpened: false };
};

export const defaultInitState: ModalState = {
  isOpened: false,
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    toggleModal: () => set((state) => ({ isOpened: !state.isOpened })),
  }));
};
