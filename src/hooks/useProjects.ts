import useSWR from "swr";
import { ProjectService } from "@/services/project.service";
import { BasicProject } from "@/models/project.model";

/**
 * Hook to fetch and manage a single project's data by its ID.
 * 
 * @param projectId - The unique identifier of the project.
 * @returns The project data, loading state, errors, and a mutate function to refresh.
 */
export function useProjectById(projectId: BasicProject["id"]) {
  const { data, isLoading, error, mutate } = useSWR(
    // Only trigger the fetch if a valid projectId is provided
    projectId ? ["project", projectId] : "",
    () => ProjectService.getProjectWithId(projectId),
  );

  return {
    project: data,
    isLoading,
    error,
    getProject: mutate,
  };
}

/**
 * Hook to fetch a list of all available users/contributors in the system.
 * 
 * @returns An object containing the list of users and SWR state helpers.
 */
export function useAllContributors() {
  const { data, isLoading, error, mutate } = useSWR("get-all-users", () =>
    ProjectService.getAllUsers(),
  );

  return {
    users: data,
    isLoading,
    error,
    getAllUsers: mutate,
  };
}

/**
 * Hook to fetch all projects the current user has access to.
 * 
 * @returns An object containing the projects array and SWR state helpers.
 */
export function useAllProjects() {
  const { data, isLoading, error, mutate } = useSWR("get-all-projects", () =>
    ProjectService.getAllProjects(),
  );

  return {
    projects: data,
    isLoading,
    error,
    refreshProject: mutate,
  };
}
