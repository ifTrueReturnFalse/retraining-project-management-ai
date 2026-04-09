import { ComponentPropsWithoutRef } from "react";
import styles from "./AITextInput.module.css";
import StarIcon from "@/components/Icons/StarIcon";

export default function AITextInput({
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Décrivez les tâches que vous souhaitez ajouter..."
        {...props}
      />
      <span className={styles.starContainer}>
        <StarIcon className={styles.star} />
      </span>
    </div>
  );
}
