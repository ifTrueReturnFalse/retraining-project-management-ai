import styles from "./KanbanView.module.css";
import KanbanColumn from "../KanbanColumn/KanbanColumn";

const kanbanColumnOptions = ["A faire", "En cours", "Terminées"];

export default function KanbanView() {
  return (
    <div className={styles.container}>
      {kanbanColumnOptions.map((option) => (
        <KanbanColumn key={option} columnName={option} />
      ))}
    </div>
  );
}
