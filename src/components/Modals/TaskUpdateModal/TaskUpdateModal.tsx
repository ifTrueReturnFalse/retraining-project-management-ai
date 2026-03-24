import styles from "./TaskUpdateModal.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import DateInput from "@/components/Inputs/DateInput/DateInput";
import { Task } from "@/models/tasks.model";

interface TaskUpdateProps {
  task: Task;
}

export default function TaskUpdateModal({ task }: TaskUpdateProps) {
  return (
    <div className={styles.container}>
      <h2>Modifier</h2>
      <TextInput label="Titre" value={task.title} />
      <TextInput label="Description" value={task.description} />
      <DateInput value={task.dueDate} onChange={console.log} />
    </div>
  );
}
