import styles from "./TaskUpdateModal.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import DateInput from "@/components/Inputs/DateInput/DateInput";
import AssigneeInput from "@/components/Inputs/AssigneeInput/AssigneeInput";
import StatusInput from "@/components/Inputs/StatusInput/StatusInput";
import Button from "@/components/Inputs/Button/Button";
import { Task } from "@/models/tasks.model";

interface TaskUpdateProps {
  task: Task;
}

export default function TaskUpdateModal({ task }: TaskUpdateProps) {
  return (
    <div className={styles.container}>
      <h2>Modifier</h2>
      <TextInput label="Titre" value={task.title} onChange={console.log} />
      <TextInput label="Description" value={task.description} onChange={console.log} />
      <DateInput value={task.dueDate} onChange={console.log} />
      <AssigneeInput task={task} />
      <StatusInput task={task} />
      <Button textButton="Enregistrer" className={styles.saveButton} />
    </div>
  );
}
