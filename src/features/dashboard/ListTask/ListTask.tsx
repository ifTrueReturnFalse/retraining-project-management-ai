import styles from "./ListTask.module.css";
import Button from "@/components/Inputs/Button/Button";
import FolderIcon from "@/components/Icons/FolderIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import MessageIcon from "@/components/Icons/MessageIcon";
import StatusTag from "@/components/Tags/StatusTag/StatusTag";
import classNames from "classnames";
import { Task } from "@/models/tasks.model";
import { ISODateToTaskView } from "@/utils/dateManagement";
import { useModalStore } from "@/store/modalStore";

interface ListTaskProps {
  kanbanStyle?: boolean;
  task: Task;
}

export default function ListTask({ kanbanStyle = false, task }: ListTaskProps) {
  const { open } = useModalStore();

  return (
    <article
      className={classNames(`${styles.container}`, {
        [styles.kanban]: kanbanStyle,
      })}
    >
      <div className={styles.subcontainer}>
        <div>
          <h3 className={styles.title}>{task.title}</h3>
        </div>
        <div>
          <StatusTag status={task.status} />
        </div>
        <div>
          <p className={styles.description}>{task.description}</p>
        </div>
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
            onClick={() => open({ type: "TASK_UPDATE", data: task })}
          />
        </div>
      </div>
    </article>
  );
}
