import styles from "./StatusInput.module.css";
import StatusTag from "@/components/Tags/StatusTag/StatusTag";
import { Task } from "@/models/tasks.model";
import { TaskStatusEnum } from "@/schemas/tasks.schema";
import classNames from "classnames";

interface StatusInputProps {
  task: Task;
}

export default function StatusInput({ task }: StatusInputProps) {
  const options = TaskStatusEnum.options;
  
  return (
    <div className={styles.container}>
      <label>Statut :</label>
      <div className={styles.statusContainer}>
        {options.map((option) => (
          <span
            key={option}
            className={classNames(styles.tag, {
              [styles.selected]: option === task.status,
            })}
          >
            <StatusTag status={option} />
          </span>
        ))}
      </div>
    </div>
  );
}
