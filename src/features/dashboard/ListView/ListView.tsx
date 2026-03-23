import styles from "./ListView.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ListTask from "../ListTask/ListTask";
import { Task, TaskPriorityLabels } from "@/models/tasks.model";
import { useSearch } from "@/hooks/useSearch";
import { useMemo } from "react";

export default function ListView({ tasks }: { tasks: Task[] }) {
  // Defines how tasks should be filtered based on the search query
  const filterFunction = (task: Task, query: string) =>
    task.title.toLowerCase().includes(query) ||
    task.description.toLowerCase().includes(query) ||
    task.project.name.toLowerCase().includes(query);

  // Custom hook to manage search state and return filtered tasks
  const { query, setQuery, filteredItems } = useSearch(tasks, filterFunction);

  // Sorts the filtered tasks first by priority (descending), then by due date (ascending)
  const sortedTasks = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      // Compare priority weights
      const priority =
        TaskPriorityLabels[b.priority].weight -
        TaskPriorityLabels[a.priority].weight;
      if (priority !== 0) return priority;

      // If priorities are equal, sort by due date
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [filteredItems]);

  return (
    <div className={styles.container}>
      <div className={styles.viewListMenu}>
        <div className={styles.viewListMenuText}>
          <h2>Mes tâches assignées</h2>
          <p>Par ordre de priorité</p>
        </div>
        {/* Search input to filter the task list */}
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className={styles.viewListTasks}>
        {/* Render the final list of filtered and sorted tasks */}
        {sortedTasks.map((task) => (
          <ListTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
