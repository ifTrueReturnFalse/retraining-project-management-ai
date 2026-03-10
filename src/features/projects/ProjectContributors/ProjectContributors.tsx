import styles from "./ProjectContributors.module.css";
import Tag from "@/components/Tag/Tag";
import UserTag from "@/components/UserTag/UserTag";

export default function ProjectContributors() {
  return (
    <div className={styles.contributors}>
      <div className={styles.contributorsNumber}>
        Contributeurs <span>3 personnes</span>
      </div>
      <div className={styles.contributorsDetails}>
        <UserTag isLeader={true} />
        <Tag bgColor="#FFE8D9" fontColor="#D3590B">
          Propriétaire
        </Tag>
        <UserTag />
        <Tag bgColor="#E5E7EB" fontColor="#6B7280">
          Bertrand Dupont
        </Tag>
        <UserTag />
        <Tag bgColor="#E5E7EB" fontColor="#6B7280">
          Bertrand Dupont
        </Tag>
      </div>
    </div>
  );
}
