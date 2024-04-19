import { createStore } from 'zustand/vanilla';

export type ModalState = {
  opened: boolean;
};

export type ModalActions = {
  toggleModal: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const initModalStore = (): ModalState => {
  return { opened: false };
};

export const defaultInitState: ModalState = {
  opened: false,
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    toggleModal: () => set((state) => ({ opened: !state.opened })),
  }));
};
