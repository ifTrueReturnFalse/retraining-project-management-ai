import useSWR from "swr";
import { ProjectService } from "@/services/project.service";
import { BasicProject } from "@/models/project.model";

export function useProjectById(projectId: BasicProject["id"]) {
  const { data, isLoading, error, mutate } = useSWR(
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
