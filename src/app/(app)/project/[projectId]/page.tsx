import styles from "./SingleProjectPage.module.css";
import SingleProjectOverview from "@/features/projects/SingleProjectOverview/SingleProjectOverview";
import ProjectContributors from "@/features/projects/ProjectContributors/ProjectContributors";

export default function SingleProjectPage() {
  return (
    <div className={styles.container}>
      <SingleProjectOverview />

      <ProjectContributors />
    </div>
  );
}
