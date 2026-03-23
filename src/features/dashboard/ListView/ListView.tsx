import styles from "./ListView.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ListTask from "../ListTask/ListTask";
import { Task, TaskPriorityLabels } from "@/models/tasks.model";

export default function ListView({ tasks }: { tasks: Task[] }) {
  if (!tasks.length) return <p>Pas de tâche assignée.</p>;

  const sortedTasks = [...tasks].sort((a, b) => {
    const priority =
      TaskPriorityLabels[b.priority].weight -
      TaskPriorityLabels[a.priority].weight;
    if (priority !== 0) return priority;

    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className={styles.container}>
      <div className={styles.viewListMenu}>
        <div className={styles.viewListMenuText}>
          <h2>Mes tâches assignées</h2>
          <p>Par ordre de priorité</p>
        </div>
        <SearchBar />
      </div>

      <div className={styles.viewListTasks}>
        {sortedTasks.map((task) => (
          <ListTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
