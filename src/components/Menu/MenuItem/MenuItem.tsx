import { ElementType } from "react";
import styles from "./MenuItem.module.css";

export interface MenuItemProps {
  text: string;
  Icon: ElementType;
}

export default function MenuItem({ text, Icon }: MenuItemProps) {
  return (
    <div className={styles.container}>
      <Icon className={styles.icon} /> <span>{text}</span>
    </div>
  );
}
