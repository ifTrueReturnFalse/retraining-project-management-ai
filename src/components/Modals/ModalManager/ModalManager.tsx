import BaseModal from "../BaseModal/BaseModal";
import { useModalStore } from "@/store/modalStore";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";
import ProjectCreateModal from "../ProjectCreateModal/ProjectCreateModal";
import TaskCreateModal from "../TaskCreateModal/TaskCreateModal";
import ProjectUpdateModal from "../ProjectUpdateModal/ProjectUpdateModal";
import TaskCreateAIModal from "../TaskCreateAIModal/TaskCreateAIModal";

/**
 * ModalManager component acts as a central registry for all modals in the application.
 * It listens to the global modal store and renders the appropriate modal component
 * based on the current state.
 * 
 * @returns {JSX.Element | null} The active modal wrapped in BaseModal, or null if no modal is active.
 */
export default function ModalManager() {
  // Access the global state to determine which modal to display and its associated data
  const { payload, isOpen, close } = useModalStore();
  const { type, data } = payload;

  /**
   * Switch statement to handle different modal types.
   * Each case returns a specific modal component wrapped in the BaseModal layout.
   */
  switch (type) {
    case "NONE":
      return null;

    case "TASK_CREATE":
      return (
        <BaseModal isOpen={isOpen} onClose={close}>
          <TaskCreateModal project={data} closeModal={close} />
        </BaseModal>
      );

    case "TASK_UPDATE":
      return (
        <BaseModal isOpen={isOpen} onClose={close}>
          <TaskUpdateModal task={data} closeModal={close} />
        </BaseModal>
      );

    case "PROJECT_CREATE":
      return (
        <BaseModal isOpen={isOpen} onClose={close}>
          <ProjectCreateModal closeModal={close} />
        </BaseModal>
      );

    case "PROJECT_UPDATE":
      return (
        <BaseModal isOpen={isOpen} onClose={close}>
          <ProjectUpdateModal project={data} closeModal={close} />
        </BaseModal>
      );

    case "TASK_CREATE_AI":
      return (
        <BaseModal isOpen={isOpen} onClose={close} isFullHeight={true}>
          <TaskCreateAIModal project={data} closeModal={close} />
        </BaseModal>
      );
  }
}
