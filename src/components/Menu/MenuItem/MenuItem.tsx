import { ElementType } from "react";
import styles from "./MenuItem.module.css";
import classNames from "classnames";
import Link from "next/link";

export interface MenuItemProps {
  text: string;
  Icon?: ElementType;
  url: string;
  isActive?: boolean;
}

export default function MenuItem({
  text,
  Icon,
  url,
  isActive = false,
}: MenuItemProps) {
  return (
    <Link
      href={url}
      className={classNames(`${styles.container}`, {
        [styles.isActive]: isActive,
      })}
    >
      {Icon && <Icon className={styles.icon} />} <span>{text}</span>
    </Link>
  );
}
