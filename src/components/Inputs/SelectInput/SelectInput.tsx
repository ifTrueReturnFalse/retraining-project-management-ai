import styles from "./SelectInput.module.css";
import classNames from "classnames";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import { ComponentPropsWithoutRef } from "react";

interface SelectInputProps extends ComponentPropsWithoutRef<"select"> {
  children?: React.ReactNode;
  className?: string;
}

export default function SelectInput({
  children,
  className = "",
  ...props
}: SelectInputProps) {
  return (
    <span className={styles.container}>
      <select
        className={classNames(styles.select, className)}
        {...props}
      >
        {children}
      </select>
      <ArrowIcon className={styles.arrow} />
    </span>
  );
}
