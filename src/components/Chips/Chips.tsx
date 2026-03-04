import { ElementType } from "react";
import styles from "./Chips.module.css";

export interface ChipsProps {
  text: string;
  Icon: ElementType;
  isActive?: boolean;
  onClick?: () => void;
}

export default function Chips({ text, Icon, isActive, onClick }: ChipsProps) {
  const active = isActive ? `${styles.chipsSelected}` : "";

  return (
    <button
      type="button"
      className={`${styles.chips} ${active}`}
      onClick={onClick}
    >
      <Icon />
      <p>{text}</p>
    </button>
  );
}
