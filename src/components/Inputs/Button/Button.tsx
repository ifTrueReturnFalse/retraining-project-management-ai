import styles from "./Button.module.css";
import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
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
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.button} ${className}`}
      type={isSubmit ? "submit" : "button"}
      disabled={disabled}
    >
      {textButton}
    </button>
  );
}
