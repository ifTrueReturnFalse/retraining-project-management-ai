import styles from "./ProjectPage.module.css";
import DashProjHead from "@/components/DashProjHead/DashProjHead";
import ProjectCard from "@/features/projects/ProjectCard/ProjectCard";

export default function ProjectPage() {
  return (
    <>
      <DashProjHead title="Mes projets" description="Gérez vos projets" />
      
      <section className={styles.projectsGrid}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </section>
    </>
  );
}
