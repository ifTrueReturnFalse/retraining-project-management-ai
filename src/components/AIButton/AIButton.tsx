import styles from "./AIButton.module.css";
import StarIcon from "../Icons/StarIcon";
import classNames from "classnames";

interface AIButtonProps {
  isLarge?: boolean;
}

export default function AIButton({ isLarge = false }: AIButtonProps) {
  return (
    <button
      type="button"
      className={classNames(styles.container, { [styles.large]: isLarge })}
    >
      <StarIcon />
      {isLarge && <p>IA</p>}
    </button>
  );
}
