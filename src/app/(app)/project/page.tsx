'use client'

import styles from "./ProjectPage.module.css";
import DashProjHead from "@/components/DashProjHead/DashProjHead";
import ProjectCard from "@/features/projects/ProjectCard/ProjectCard";
import { useAllProjects } from "@/hooks/useProjects";
import ModalManager from "@/components/Modals/ModalManager/ModalManager";

export default function ProjectPage() {
  const {projects} = useAllProjects()
  
  return (
    <>
      <ModalManager />
      
      <DashProjHead title="Mes projets" description="Gérez vos projets" />
      
      <section className={styles.projectsGrid}>
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  );
}
