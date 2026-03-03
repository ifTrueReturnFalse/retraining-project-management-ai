import styles from "./Button.module.css";

interface ButtonProps {
  textButton: string;
  isSubmit?: boolean;
  disabled?: boolean;
}

export default function Button({
  textButton,
  isSubmit = false,
  disabled = false,
}: ButtonProps) {
  return (
    <>
      <button
        className={styles.button}
        type={isSubmit ? "submit" : "button"}
        disabled={disabled ? true : false}
      >
        {textButton}
      </button>
    </>
  );
}
