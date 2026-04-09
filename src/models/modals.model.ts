import { Task } from "./tasks.model";
import { Project } from "./project.model";

export type ModalPayload =
  | { type: "NONE"; data: null }
  | { type: "TASK_CREATE"; data: Project }
  | { type: "TASK_CREATE_AI"; data: Project }
  | { type: "TASK_UPDATE"; data: Task }
  | { type: "PROJECT_CREATE"; data: null }
  | { type: "PROJECT_UPDATE"; data: Project }

export interface ModalStore {
  payload: ModalPayload;
  isOpen: boolean;
  open: (payload: ModalPayload) => void;
  close: () => void;
}
