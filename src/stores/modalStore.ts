import { createStore } from 'zustand/vanilla';
import { ModalType } from '@/types/types';

export type ModalState = {
  isOpened: boolean;
  modalType: ModalType;
};

export type ModalActions = {
  toggleModal: () => void;
  setModalType: (modalType: ModalType) => void;
};

export type ModalStore = ModalState & ModalActions;

export const initModalStore = (): ModalState => {
  return { isOpened: false, modalType: null };
};

export const defaultInitState: ModalState = {
  isOpened: false,
  modalType: null,
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    toggleModal: () => set((state) => ({ isOpened: !state.isOpened })),
    setModalType: (modalType: ModalType) => set(() => ({ modalType })),
  }));
};
