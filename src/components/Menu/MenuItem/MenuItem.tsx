import { ElementType } from "react";
import styles from "./MenuItem.module.css";
import classNames from "classnames";

export interface MenuItemProps {
  text: string;
  Icon: ElementType;
  isActive?: boolean;
}

export default function MenuItem({
  text,
  Icon,
  isActive = false,
}: MenuItemProps) {
  return (
    <div
      className={classNames(`${styles.container}`, {
        [styles.isActive]: isActive,
      })}
    >
      <Icon className={styles.icon} /> <span>{text}</span>
    </div>
  );
}
