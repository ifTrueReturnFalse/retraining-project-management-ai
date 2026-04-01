import styles from "./ProjectTaskCommentInput.module.css";
import UserTag from "@/components/Tags/UserTag/UserTag";
import Button from "@/components/Inputs/Button/Button";

export default function ProjectTaskCommentInput() {
  return (
    <div className={styles.container}>
      <div className={styles.inputZone}>
        <UserTag className={styles.user} name="AA"  />
        <textarea name="" id="" placeholder="Ajouter un commentaire"></textarea>
      </div>

      <div className={styles.buttonContainer}>
        <Button textButton="Envoyer" className={styles.button} />
      </div>
    </div>
  );
}
