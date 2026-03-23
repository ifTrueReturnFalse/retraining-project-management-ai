import { ComponentPropsWithoutRef } from "react";
import styles from "./SearchBar.module.css";
import MagGlassIcon from "@/components/Icons/MagGlassIcon";

interface SearchBarProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "onChange"
> {
  onChange: (value: string) => void;
}

export default function SearchBar({ onChange, ...props }: SearchBarProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.searchBar}
        placeholder="Rechercher une tâche"
        value={props.value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="button" className={styles.button}>
        <MagGlassIcon />
      </button>
    </div>
  );
}
