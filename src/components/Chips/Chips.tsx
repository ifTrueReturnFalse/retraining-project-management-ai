import { ElementType } from "react";
import styles from "./Chips.module.css";

export interface ChipsProps {
  text: string;
  Icon: ElementType;
}

export default function Chips({ text, Icon }: ChipsProps) {
  return (
    <button type="button" className={styles.chips}>
      <Icon />
      <p>{text}</p>
    </button>
  );
}
