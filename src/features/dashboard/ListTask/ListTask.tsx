import styles from "./ListTask.module.css";
import Button from "@/components/Inputs/Button/Button";
import FolderIcon from "@/components/Icons/FolderIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import MessageIcon from "@/components/Icons/MessageIcon";
import StatusTag from "@/components/Tags/StatusTag/StatusTag";
import classNames from "classnames";
import { Task } from "@/models/tasks.model";
import { ISODateToTaskView } from "@/utils/dateManagement";

interface ListTaskProps {
  kanbanStyle?: boolean;
  task: Task;
}

export default function ListTask({ kanbanStyle = false, task }: ListTaskProps) {
  return (
    <article
      className={classNames(`${styles.container}`, {
        [styles.kanban]: kanbanStyle,
      })}
    >
      <div className={styles.subcontainer}>
        <div className={styles.nameDescription}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <StatusTag status={task.status} />
      </div>

      <div className={styles.detailContainer}>
        <p className={styles.taskDetail}>
          <span>
            <FolderIcon /> {task.project.name}
          </span>

          <span>|</span>

          <span>
            <CalendarIcon /> {ISODateToTaskView(task.dueDate)}
          </span>

          <span>|</span>

          <span>
            <MessageIcon /> {task.comments.length}
          </span>
        </p>
        <div>
          <Button
            textButton="Voir"
            isSubmit={false}
            className={styles.button}
          />
        </div>
      </div>
    </article>
  );
}
