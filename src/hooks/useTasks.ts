import useSWR from "swr";
import { dashboardService } from "@/services/dashboard.service";
import { Project } from "@/models/project.model";
import { TaskService } from "@/services/tasks.service";

export function useAssignedTasks() {
  const { data, error, mutate, isLoading } = useSWR("assigned-tasks", () =>
    dashboardService.getAssignedTasks(),
  );

  return {
    tasks: data?.tasks || [],
    isLoading,
    isError: error,
    refreshTasks: mutate,
  };
}

export function useProjectTasks(projectId: Project["id"]) {
  const { data, isLoading, mutate, error } = useSWR(
    projectId ? [`project-tasks-${projectId}`] : "",
    () => TaskService.getTasksProject(projectId),
  );

  return {
    tasks: data,
    isLoading,
    error,
    refreshTasks: mutate,
  };
}
