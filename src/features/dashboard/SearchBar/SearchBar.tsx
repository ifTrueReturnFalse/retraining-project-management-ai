import styles from "./SearchBar.module.css";
import MagGlassIcon from "@/components/Icons/MagGlassIcon";

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <input type="text" name="" id="" className={styles.searchBar} placeholder="Rechercher une tâche" />
      <button type="button" className={styles.button}>
        <MagGlassIcon />
      </button>
    </div>
  );
}
