import styles from "./TextInput.module.css";
import { HTMLInputTypeAttribute } from "react";

interface TextInputProps {
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export default function TextInput({
  label,
  type='text',
  placeholder = "",
}: TextInputProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="" className={styles.label}>
        {label}
      </label>


      <input type={type} className={styles.input} placeholder={placeholder} />
    </div>
  );
}
