import styles from "./ProjectContributors.module.css";
import UserContributorTag from "@/components/Tags/UserContributorTag/UserContributorTag";
import UserTag from "@/components/Tags/UserTag/UserTag";

export default function ProjectContributors() {
  return (
    <div className={styles.contributors}>
      <div className={styles.contributorsNumber}>
        Contributeurs <span>3 personnes</span>
      </div>
      <div className={styles.contributorsDetails}>
        <UserTag isLeader={true} name="AA" />
        <UserContributorTag isOwner={true} userName="Proprio" />
        
        <UserTag name="AA" />
        <UserContributorTag userName="Un contributeur" />
        <UserTag name="AA" />
        <UserContributorTag userName="Un contributeur" />
      </div>
    </div>
  );
}
