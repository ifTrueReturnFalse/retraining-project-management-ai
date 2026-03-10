import styles from "./ListView.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ListTask from "../ListTask/ListTask";

export default function ListView() {
  return (
    <div className={styles.container}>
      <div className={styles.viewListMenu}>
        <div className={styles.viewListMenuText}>
          <h2>Mes tâches assignées</h2>
          <p>Par ordre de priorité</p>
        </div>
        <SearchBar />
      </div>

      <div className={styles.viewListTasks}>{/** Future taches ici */}
        <ListTask />
        <ListTask />
      </div>
    </div>
  );
}
