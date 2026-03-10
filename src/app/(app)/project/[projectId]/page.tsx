import styles from "./SingleProjectPage.module.css";
import SingleProjectOverview from "@/features/projects/SingleProjectOverview/SingleProjectOverview";
import ProjectContributors from "@/features/projects/ProjectContributors/ProjectContributors";
import ProjectTasksContainer from "@/features/projects/ProjectTasksContainer/ProjectTasksContainer";

export default function SingleProjectPage() {
  return (
    <div className={styles.container}>
      <SingleProjectOverview />

      <ProjectContributors />

      <ProjectTasksContainer />
    </div>
  );
}
