import { Task } from "./tasks.model";

export type ModalPayload =
  | { type: "NONE"; data: null }
  | { type: "TASK_CREATE"; data: null }
  | { type: "TASK_CREATE_AI"; data: null }
  | { type: "TASK_UPDATE"; data: Task }
  | { type: "PROJECT_CREATE"; data: null }
  | { type: "PROJECT_UPDATE"; data: null }

export interface ModalStore {
  payload: ModalPayload;
  isOpen: boolean;
  open: (payload: ModalPayload) => void;
  close: () => void;
}
