import styles from "./KanbanColumn.module.css";

interface KanbanColumnProps {
  columnName: string;
}

export default function KanbanColumn({ columnName }: KanbanColumnProps) {
  return <div>{columnName}</div>;
}
