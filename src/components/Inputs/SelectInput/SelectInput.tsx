import styles from "./SelectInput.module.css";
import classNames from "classnames";
import ArrowIcon from "@/components/Icons/ArrowIcon";

interface SelectInputProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SelectInput({
  children,
  className = "",
}: SelectInputProps) {
  return (
    <span className={styles.container}>
      <select name="" id="" className={classNames(styles.select, className)}>
        {children}
      </select>
      <ArrowIcon className={styles.arrow} />
    </span>
  );
}
