import styles from "./Tag.module.css";
import { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";

interface TagProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

export default function Tag({
  children,
  ...props
}: TagProps) {
  return (
    <div
      className={classNames(styles.tag, props.className)}
    >
      {children}
    </div>
  );
}
