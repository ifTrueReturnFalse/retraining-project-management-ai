import classNames from "classnames";
import styles from "./IconButton.module.css";
import { ComponentPropsWithoutRef } from "react";

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  className?: string;
}

export default function IconButton({
  children,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button className={classNames(styles.button, className)} {...props}>
      {children}
    </button>
  );
}
