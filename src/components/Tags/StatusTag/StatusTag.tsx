import styles from "./StatusTag.module.css";
import Tag from "../Tag/Tag";
import { TaskStatusLabels, TaskStatus } from "@/models/tasks.model";
import classNames from "classnames";

interface StatusTagProps {
  status: TaskStatus;
}

export default function StatusTag({ status }: StatusTagProps) {
  return (
    <Tag
      className={classNames({
        [styles.todo]: status === "TODO",
        [styles.inprogress]: status === "IN_PROGRESS",
        [styles.done]: status === "DONE",
      })}
    >
      {TaskStatusLabels[status]}
    </Tag>
  );
}
