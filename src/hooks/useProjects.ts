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
