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

const ChipsOptions = [
  { text: "Liste", value: "list", Icon: TaskIcon },
  { text: "Calendrier", value: "calendar", Icon: CalendarIcon },
];

interface ProjectTasksContainerProps {
  projectId: Project["id"];
}

export default function ProjectTasksContainer({
  projectId,
}: ProjectTasksContainerProps) {
  const searchParams = useSearchParams();
  const viewType = searchParams.get("view") || "list";
  const { tasks, isLoading } = useProjectTasks(projectId);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filterFunction = (task: Task, query: string) =>
    task.title.toLowerCase().includes(query) ||
    task.description.toLowerCase().includes(query);

  const { query, setQuery, filteredItems } = useSearch(tasks, filterFunction);

  const statusFilteredTasks = useMemo(() => {
    if (filterStatus === "ALL") return filteredItems;
    return filteredItems.filter((item) => item.status === filterStatus);
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
            {ChipsOptions.map((option) => (
              <Chips
                key={option.value}
                text={option.text}
                Icon={option.Icon}
                isActive={viewType === option.value}
              />
            ))}
          </span>

          <SelectInput value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)}>
            <option value="ALL">Toutes</option>
            {Object.entries(TaskStatusLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </SelectInput>

          <SearchBar value={query} onChange={setQuery} />
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
