import styles from "./SingleProjectOverview.module.css";
import Button from "@/components/Inputs/Button/Button";
import AIButton from "@/components/AIButton/AIButton";
import IconButton from "@/components/Inputs/IconButton/IconButton";

export default function SingleProjectOverview() {
  return (
    <div className={styles.head}>
      <IconButton className={styles.backButton}>&larr;</IconButton>
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
  );
}
