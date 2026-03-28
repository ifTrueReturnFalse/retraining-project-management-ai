import styles from "./StatusInput.module.css";
import StatusTag from "@/components/Tags/StatusTag/StatusTag";
import { TaskStatusEnum } from "@/schemas/tasks.schema";
import classNames from "classnames";

interface StatusInputProps {
  value: string
  onChange: (value: string) => void
}

export default function StatusInput({ value, onChange }: StatusInputProps) {
  const options = TaskStatusEnum.options;

  return (
    <div className={styles.container}>
      <label>Statut :</label>
      <div className={styles.statusContainer}>
        {options.map((option) => (
          <span
            key={option}
            className={classNames(styles.tag, {
              [styles.selected]: option === value,
            })}
            onClick={() => onChange(option)}
          >
            <StatusTag status={option} />
          </span>
        ))}
      </div>
    </div>
  );
}
