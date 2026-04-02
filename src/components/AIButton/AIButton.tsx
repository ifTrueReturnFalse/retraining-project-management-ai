import styles from "./AIButton.module.css";
import StarIcon from "../Icons/StarIcon";
import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

interface AIButtonProps extends ComponentPropsWithoutRef<"button"> {
  isLarge?: boolean;
}

export default function AIButton({ isLarge = false, ...props }: AIButtonProps) {
  return (
    <button
      type="button"
      className={classNames(styles.container, { [styles.large]: isLarge })}
      {...props}
    >
      <StarIcon />
      {isLarge && <p>IA</p>}
    </button>
  );
}
