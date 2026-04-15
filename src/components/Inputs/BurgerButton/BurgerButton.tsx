import styles from "./BurgerButton.module.css";
import classNames from "classnames";

interface BurgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function BurgerButton({ isOpen, onClick }: BurgerButtonProps) {
  return (
    <div
      className={classNames(styles.container, { [styles.open]: isOpen })}
      onClick={() => onClick()}
    >
      <div
        className={classNames(styles.bar, { [styles.barOpen]: isOpen })}
      ></div>
      <div
        className={classNames(styles.bar, { [styles.barOpen]: isOpen })}
      ></div>
      <div
        className={classNames(styles.bar, { [styles.barOpen]: isOpen })}
      ></div>
    </div>
  );
}
