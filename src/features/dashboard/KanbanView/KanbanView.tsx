import styles from "./KanbanView.module.css";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { TaskStatusLabels, Task } from "@/models/tasks.model";
import { TaskStatusEnum } from "@/schemas/tasks.schema";

const columnStatuses = TaskStatusEnum.options;

export default function KanbanView({ tasks }: {tasks: Task[]}) {
  const groupedTasks = columnStatuses.reduce(
    (acc, status) => {
      acc[status] = tasks.filter((t) => t.status === status);
      return acc;
    },
    {} as Record<string, Task[]>,
  );

  return (
    <div className={styles.container}>
      {columnStatuses.map((status) => (
        <KanbanColumn
          key={status}
          columnName={TaskStatusLabels[status]}
          tasks={groupedTasks[status] || []}
        />
      ))}
    </div>
  );
}
