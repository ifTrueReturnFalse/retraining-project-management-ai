import useSWR from "swr";
import { dashboardService } from "@/services/dashboard.service";

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
