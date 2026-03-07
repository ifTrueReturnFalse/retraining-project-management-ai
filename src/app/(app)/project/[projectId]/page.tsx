import styles from "./SingleProjectPage.module.css";
import Button from "@/components/Inputs/Button/Button";
import AIButton from "@/components/AIButton/AIButton";
import Tag from "@/components/Tag/Tag";
import UserTag from "@/components/UserTag/UserTag";

export default function SingleProjectPage() {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.projectDetail}>
          <div className={styles.titleEdit}>
            <h2>Nom du projet</h2>
            <p>Modifier</p>
          </div>
          <p className={styles.description}>Description du projet</p>
        </div>
        <div className={styles.buttonsContainer}>
          <Button textButton="Créer une tâche" />
          <AIButton isLarge={true} />
        </div>
      </div>

      <div className={styles.contributors}>
        <div className={styles.contributorsNumber}>Contributeurs <span>3 personnes</span></div>
        <div className={styles.contributorsDetails}>
          <UserTag isLeader={true} />
          <Tag bgColor="#FFE8D9" fontColor="#D3590B">Propriétaire</Tag>
          <UserTag />
          <Tag bgColor="#E5E7EB" fontColor="#6B7280">Bertrand Dupont</Tag>
          <UserTag />
          <Tag bgColor="#E5E7EB" fontColor="#6B7280">Bertrand Dupont</Tag>
        </div>
      </div>
    </div>
  );
}
