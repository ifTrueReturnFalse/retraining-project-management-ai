import styles from "./UserTag.module.css";
import classNames from "classnames";
import { getInitials } from "@/utils/getInitials";

interface UserTagProps {
  isLeader?: boolean;
  className?: string;
  name: string;
}

export default function UserTag({
  isLeader = false,
  className = "",
  name,
}: UserTagProps) {
  return (
    <div
      className={classNames(styles.container, className, {
        [styles.leader]: isLeader,
      })}
    >
      {getInitials(name)}
    </div>
  );
}
