import { ComponentPropsWithoutRef } from "react";
import styles from "./AITextInput.module.css";
import StarIcon from "@/components/Icons/StarIcon";
import classNames from "classnames";

interface AITextInputProps extends ComponentPropsWithoutRef<"input"> {
  isLoading: boolean;
}

export default function AITextInput({ isLoading, ...props }: AITextInputProps) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Décrivez les tâches que vous souhaitez ajouter..."
        {...props}
      />
      <span className={classNames(styles.starContainer, { [styles.spin]: isLoading })}>
        <StarIcon
          className={styles.star}
        />
      </span>
    </div>
  );
}
