import styles from "./ListTask.module.css";
import Button from "@/components/Inputs/Button/Button";
import FolderIcon from "@/components/Icons/FolderIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import MessageIcon from "@/components/Icons/MessageIcon";
import Tag from "@/components/Tag/Tag";
import classNames from "classnames";

interface ListTaskProps {
  kanbanStyle?: boolean;
}

export default function ListTask({ kanbanStyle = false }: ListTaskProps) {
  return (
    <article
      className={classNames(`${styles.container}`, {
        [styles.kanban]: kanbanStyle,
      })}
    >
      <div className={styles.subcontainer}>
        <div className={styles.nameDescription}>
          <h3>Nom de la tâche</h3>
          <p>Description de la tâche</p>
        </div>
        <Tag>Futur état</Tag>
      </div>

      <div className={styles.detailContainer}>
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
