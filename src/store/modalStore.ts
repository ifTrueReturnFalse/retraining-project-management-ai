import { create } from "zustand";
import { ModalStore } from "@/models/modals.model";

/**
 * Zustand store to manage the global state of modals in the application.
 * It tracks which modal is open and what data (payload) it needs.
 */
export const useModalStore = create<ModalStore>((set) => ({
  /**
   * The current payload of the modal.
   * Defaults to type "NONE" with no data.
   */
  payload: { type: "NONE", data: null },

  /**
   * Boolean flag indicating if a modal is currently visible.
   */
  isOpen: false,

  /**
   * Opens a specific modal with the provided payload.
   * @param payload - Object containing the modal type and associated data.
   */
  open: (payload) => set({ payload, isOpen: true }),

  /**
   * Closes the active modal and resets the payload to its initial state.
   */
  close: () => set({ payload: { type: "NONE", data: null }, isOpen: false }),
}));
