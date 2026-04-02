'use client'

import styles from "./SingleProjectPage.module.css";
import SingleProjectOverview from "@/features/projects/SingleProjectOverview/SingleProjectOverview";
import ProjectContributors from "@/features/projects/ProjectContributors/ProjectContributors";
import ProjectTasksContainer from "@/features/projects/ProjectTasksContainer/ProjectTasksContainer";
import ModalManager from "@/components/Modals/ModalManager/ModalManager";
import { useProjectById } from "@/hooks/useProjects";
import { useParams } from "next/navigation";

export default function SingleProjectPage() {
  const params = useParams<{projectId: string}>()
  const {project, isLoading} = useProjectById(params.projectId)
  
  return (
    <div className={styles.container}>
      <ModalManager />
      
      {project && <SingleProjectOverview project={project} />}

      {project && <ProjectContributors project={project} />}

      <ProjectTasksContainer projectId={params.projectId} />
    </div>
  );
}
