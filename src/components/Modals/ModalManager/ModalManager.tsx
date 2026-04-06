import BaseModal from "../BaseModal/BaseModal";
import { useModalStore } from "@/store/modalStore";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";
import ProjectCreateModal from "../ProjectCreateModal/ProjectCreateModal";
import TaskCreateModal from "../TaskCreateModal/TaskCreateModal";

export default function ModalManager() {
  const { payload, isOpen, close } = useModalStore();
  const { type, data } = payload;

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
  }
}
