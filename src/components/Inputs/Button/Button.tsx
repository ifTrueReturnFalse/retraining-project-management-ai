import styles from "./Button.module.css";

interface ButtonProps {
  textButton: string;
  isSubmit?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  textButton,
  isSubmit = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <>
      <button
        className={`${styles.button} ${className}`}
        type={isSubmit ? "submit" : "button"}
        disabled={disabled ? true : false}
      >
        {textButton}
      </button>
    </>
  );
}
