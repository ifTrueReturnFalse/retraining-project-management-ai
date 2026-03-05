import styles from "./KanbanColumn.module.css";
import Tag from "@/components/Tag/Tag";
import ListTask from "../ListTask/ListTask";

interface KanbanColumnProps {
  columnName: string;
}

export default function KanbanColumn({ columnName }: KanbanColumnProps) {
  return (
    <div className={styles.container}>
      <div className={styles.columnHead}>
        <p>{columnName}</p>
        <Tag bgColor="#E5E7EB" fontColor="#6B7280">
          4
        </Tag>
      </div>

      <div className={styles.taskContainer}>
        <ListTask kanbanStyle={true} />
      </div>
    </div>
  );
}
