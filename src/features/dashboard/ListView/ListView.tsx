import styles from "./ListView.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ListTask from "../ListTask/ListTask";
import { Task } from "@/models/tasks.model";

export default function ListView({ tasks }: { tasks: Task[] }) {
  if (!tasks.length) return <p>Pas de tâche assignée.</p>;

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
        {tasks.map((task) => (
          <ListTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
