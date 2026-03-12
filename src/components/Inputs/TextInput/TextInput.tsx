import styles from "./TextInput.module.css";
import { ComponentPropsWithoutRef } from "react";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  id?: string;
}

export default function TextInput({ label, id, ...props }: TextInputProps) {
  const inputId = id || props.name;

  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <input id={inputId} className={styles.input} {...props} />
    </div>
  );
}
