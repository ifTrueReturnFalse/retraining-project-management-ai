import { ElementType } from "react";
import styles from "./Chips.module.css";
import classNames from "classnames";

export interface ChipsProps {
  text: string;
  Icon: ElementType;
  isActive?: boolean;
  onClick?: () => void;
}

export default function Chips({ text, Icon, isActive, onClick }: ChipsProps) {
  return (
    <button
      type="button"
      className={classNames(`${styles.chips}`, {[styles.chipsSelected]: isActive})}
      onClick={onClick}
    >
      <Icon />
      <p>{text}</p>
    </button>
  );
}
