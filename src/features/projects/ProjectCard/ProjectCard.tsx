import styles from "./ProjectCard.module.css";
import TeamIcon from "@/components/Icons/TeamIcon";
import UserTag from "@/components/Tags/UserTag/UserTag";
import Tag from "@/components/Tags/Tag/Tag";
import Link from "next/link";
import routes from "@/utils/routes";

export default function ProjectCard() {
  return (
    <Link href={routes.PROJECT("123")} className={styles.container}>
      <h3 className={styles.title}>Nom du projet</h3>
      <p className={styles.description}>Description du projet</p>

      <div className={styles.progressPercent}>
        <p>Progression</p>
        <p>0%</p>
      </div>

      <div className={styles.progressBar}></div>

      <p className={styles.tasks}>0/2 tâches terminées</p>

      <div className={styles.team}>
        <TeamIcon />
        Equipe (3)
      </div>

      <div className={styles.contributors}>
        <UserTag isLeader={true} />
        <Tag className={styles.owner}>
          Propriétaire
        </Tag>
        <div className={styles.invitedContainer}>
          <UserTag className={styles.invited} />
          <UserTag className={styles.invited} />
          <UserTag className={styles.invited} />
          <UserTag className={styles.invited} />
        </div>
      </div>
    </Link>
  );
}
