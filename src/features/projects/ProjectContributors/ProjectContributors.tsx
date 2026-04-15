import styles from "./ProjectContributors.module.css";
import UserContributorTag from "@/components/Tags/UserContributorTag/UserContributorTag";
import UserTag from "@/components/Tags/UserTag/UserTag";
import { Project } from "@/models/project.model";

interface ProjectContributorsProps {
  project: Project;
}

export default function ProjectContributors({
  project,
}: ProjectContributorsProps) {
  return (
    <div className={styles.contributors}>
      <div className={styles.contributorsNumber}>
        Contributeurs <span>{project.members.length} personnes</span>
      </div>
      <div className={styles.contributorsDetails}>
        <span className={styles.ownerDetails}>
          <UserTag isLeader={true} name={project.owner.name} />
          <UserContributorTag isOwner={true} userName={project.owner.name} />
        </span>

        {project.members
          .filter((member) => member.userId !== project.ownerId)
          .map((member) => (
            <span key={member.id} className={styles.member}>
              <UserTag name={member.user.name} />
              <UserContributorTag userName={member.user.name} />
            </span>
          ))}
      </div>
    </div>
  );
}
