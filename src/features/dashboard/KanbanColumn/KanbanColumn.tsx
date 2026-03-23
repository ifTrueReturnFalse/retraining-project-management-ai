import styles from "./KanbanColumn.module.css";
import Tag from "@/components/Tags/Tag/Tag";
import ListTask from "../ListTask/ListTask";
import { Task } from "@/models/tasks.model";

interface KanbanColumnProps {
  columnName: string;
  tasks: Task[];
}

export default function KanbanColumn({ columnName, tasks }: KanbanColumnProps) {
  return (
    <div className={styles.container}>
      <div className={styles.columnHead}>
        <p>{columnName}</p>
        <Tag className={styles.columnTag}>
          {tasks.length}
        </Tag>
      </div>

      <div className={styles.taskContainer}>
        {tasks.map((task) => (
          <ListTask key={task.id} kanbanStyle={true} task={task} />
        ))}
      </div>
    </div>
  );
}
