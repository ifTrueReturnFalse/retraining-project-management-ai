import BaseModal from "../BaseModal/BaseModal";
import { useModalStore } from "@/store/modalStore";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";

export default function ModalManager() {
  const { payload, isOpen, close } = useModalStore();
  const { type, data } = payload;

  switch (type) {
    case "NONE":
      return null;

    case "TASK_UPDATE":
      return <BaseModal isOpen={isOpen} onClose={close}><TaskUpdateModal task={data} closeModal={close} /></BaseModal>;
  }
}
