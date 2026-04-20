import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { dashboardService } from "@/services/dashboard.service";
import { Project } from "@/models/project.model";
import { TaskService } from "@/services/tasks.service";
import { Task } from "@/models/tasks.model";

/**
 * Hook to fetch tasks assigned to the currently authenticated user.
 * 
 * @returns An object containing the list of tasks, loading state, error state, and a refresh function.
 */
export function useAssignedTasks() {
  const { data, error, mutate, isLoading } = useSWR("assigned-tasks", () =>
    dashboardService.getAssignedTasks(),
  );

  // Extract tasks from the response object or return an empty array as fallback
  // data?.tasks || []
  return {
    tasks: data?.tasks || [],
    isLoading,
    isError: error,
    refreshTasks: mutate,
  };
}

/**
 * Hook to fetch all tasks associated with a specific project.
 * 
 * @param projectId - The unique identifier of the project.
 * @returns An object containing the project tasks and SWR state helpers.
 */
export function useProjectTasks(projectId: Project["id"]) {
  const { data, isLoading, mutate, error } = useSWR(
    // Conditional fetching: only run if projectId is truthy
    projectId ? [`project-tasks`, projectId] : null,
    () => TaskService.getTasksProject(projectId),
  );

  return {
    tasks: data || [],
    isLoading,
    error,
    refreshTasks: mutate,
  };
}

/**
 * Hook to handle the creation of a new comment on a specific task.
 * Uses useSWRMutation for manual triggering of the POST request.
 * 
 * @param params - Object containing projectId and taskId.
 * @returns An object containing the trigger function (createComment), mutation state, and errors.
 */
export function usePostComment({
  projectId,
  taskId,
}: {
  projectId: Project["id"];
  taskId: Task["id"];
}) {
  const { trigger, isMutating, error } = useSWRMutation(
    // Unique key for the mutation based on project and task context
    [`project-${projectId}-tasks-${taskId}-comments`],
    // The 'arg' here represents the comment string passed to the trigger function
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
