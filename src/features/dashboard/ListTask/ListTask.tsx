import styles from "./ListTask.module.css";
import Button from "@/components/Inputs/Button/Button";
import FolderIcon from "@/components/Icons/FolderIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import MessageIcon from "@/components/Icons/MessageIcon";
import Tag from "@/components/Tag/Tag";

export default function ListTask() {
  return (
    <article className={styles.container}>
      <div className={styles.subcontainer}>
        <div className={styles.nameDescription}>
          <h3>Nom de la tâche</h3>
          <p>Description de la tâche</p>
        </div>
        <Tag>Futur état</Tag>
      </div>

      <div className={styles.subcontainer}>
        <p className={styles.taskDetail}>
          <span>
            <FolderIcon /> Nom du projet
          </span>

          <span>|</span>

          <span>
            <CalendarIcon /> 9 mars
          </span>

          <span>|</span>

          <span>
            <MessageIcon /> 2
          </span>
        </p>
        <div>
          <Button
            textButton="Voir"
            isSubmit={false}
            className={styles.button}
          />
        </div>
      </div>
    </article>
  );
}
