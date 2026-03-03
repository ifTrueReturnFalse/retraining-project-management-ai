import styles from "./TextInput.module.css";

interface TextInputProps {
  label: string;
  isPassword: boolean;
  placeholder?: string;
}

export default function TextInput({
  label,
  isPassword,
  placeholder = "",
}: TextInputProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="" className={styles.label}>
        {label}
      </label>

      {!isPassword && (
        <input type="text" className={styles.input} placeholder={placeholder} />
      )}
      {isPassword && (
        <input
          type="password"
          className={styles.input}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
