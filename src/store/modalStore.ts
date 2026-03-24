import { create } from "zustand";
import { ModalStore } from "@/models/modals.model";

export const useModalStore = create<ModalStore>((set) => ({
  payload: { type: "NONE", data: null },
  isOpen: false,
  open: (payload) => set({ payload, isOpen: true }),
  close: () => set({ payload: { type: "NONE", data: null }, isOpen: false }),
}));
