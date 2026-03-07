import styles from "./UserTag.module.css";
import classNames from "classnames";

interface UserTagProps {
  isLeader?: boolean;
  className?: string;
}

export default function UserTag({
  isLeader = false,
  className = "",
}: UserTagProps) {
  return (
    <div
      className={classNames(styles.container, className, {
        [styles.leader]: isLeader,
      })}
    >
      AA
    </div>
  );
}
