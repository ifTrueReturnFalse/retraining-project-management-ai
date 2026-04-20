"use client";

import styles from "./ProjectTasksContainer.module.css";
import Chips from "@/components/Chips/Chips";
import TaskIcon from "@/components/Icons/TaskIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar/SearchBar";
import SelectInput from "@/components/Inputs/SelectInput/SelectInput";
import ProjectTask from "../ProjectTask/ProjectTask";
import { Project } from "@/models/project.model";
import { useProjectTasks } from "@/hooks/useTasks";
import { useSearch } from "@/hooks/useSearch";
import { Task } from "@/models/tasks.model";
import { useMemo, useState } from "react";
import { TaskStatusLabels } from "@/models/tasks.model";
import { TaskPriorityLabels } from "@/models/tasks.model";
import { toast } from "sonner";

const ChipsOptions = [
  { text: "Liste", value: "list", Icon: TaskIcon },
  { text: "Calendrier", value: "calendar", Icon: CalendarIcon },
];

interface ProjectTasksContainerProps {
  projectId: Project["id"];
}

/**
 * Container component for managing and displaying project tasks.
 * Handles filtering by status, searching by text, and sorting by priority/date.
 * 
 * @param {ProjectTasksContainerProps} props - The component props containing projectId.
 */
export default function ProjectTasksContainer({
  projectId,
}: ProjectTasksContainerProps) {
  const searchParams = useSearchParams();
  /**
   * viewType determines the layout (list vs calendar). 
   * Currently defaults to 'list' as calendar is not implemented.
   */
  const viewType = searchParams.get("view") || "list";
  const { tasks, isLoading } = useProjectTasks(projectId);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filterFunction = (task: Task, query: string) =>
    task.title.toLowerCase().includes(query) ||
    task.description.toLowerCase().includes(query);

  const { query, setQuery, filteredItems } = useSearch(tasks, filterFunction);

  /**
   * Memoized logic to filter and sort tasks.
   * 1. Filters by status (if not 'ALL').
   * 2. Sorts by priority weight (descending).
   * 3. Sorts by due date (ascending) if priorities are equal.
   */
  const statusFilteredTasks = useMemo(() => {
    const unsortedItems =
      filterStatus === "ALL"
        ? [...filteredItems]
        : filteredItems.filter((item) => item.status === filterStatus);
        
    return unsortedItems.sort((a, b) => {
      // Calculate priority difference based on numeric weights defined in TaskPriorityLabels
      // Higher weight (e.g., HIGH) comes first.
      const priority =
        TaskPriorityLabels[b.priority].weight -
        TaskPriorityLabels[a.priority].weight;
      if (priority !== 0) return priority;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [filteredItems, filterStatus]);

  return (
    <section className={styles.container}>
      <div className={styles.head}>
        <div className={styles.title}>
          <h2>Tâches</h2>
          <p>Par ordre de priorité</p>
        </div>

        <div className={styles.controls}>
          <span>
            {ChipsOptions.map((option) => {
              return (
                <Chips
                  key={option.value}
                  text={option.text}
                  Icon={option.Icon}
                  isActive={viewType === option.value}
                  onClick={() => {
                    if (option.value === "calendar")
                      toast.message(
                        "Cette fonctionnalité n'est pas encore disponible",
                      );
                  }}
                />
              );
            })}
          </span>

          <span>
            <SelectInput
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
            >
              <option value="ALL">Toutes</option>
              {Object.entries(TaskStatusLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </SelectInput>

            <SearchBar value={query} onChange={setQuery} />
          </span>
        </div>
      </div>

      <div className={styles.tasksContainer}>
        {statusFilteredTasks?.map((task) => (
          <ProjectTask key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
