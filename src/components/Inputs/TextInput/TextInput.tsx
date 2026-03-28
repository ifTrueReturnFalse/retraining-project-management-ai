import styles from "./TextInput.module.css";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  id?: string;
  error?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className={styles.container}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>

        <input id={inputId} className={styles.input} ref={ref} {...props} />

        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
