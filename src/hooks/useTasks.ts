import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { dashboardService } from "@/services/dashboard.service";
import { Project } from "@/models/project.model";
import { TaskService } from "@/services/tasks.service";
import { Task } from "@/models/tasks.model";

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
    tasks: data || [],
    isLoading,
    error,
    refreshTasks: mutate,
  };
}

export function usePostComment({
  projectId,
  taskId,
}: {
  projectId: Project["id"];
  taskId: Task["id"];
}) {
  const { trigger, isMutating, error } = useSWRMutation(
    [`project-${projectId}-tasks-${taskId}-comments`],
    (_, { arg }: { arg: string }) =>
      TaskService.postComment(projectId, taskId, arg),
    { revalidate: true },
  );

  return {
    createComment: trigger,
    isMutating,
    error,
  };
}
