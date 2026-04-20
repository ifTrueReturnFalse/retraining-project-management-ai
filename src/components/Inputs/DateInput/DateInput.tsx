import styles from "./DateInput.module.css";
import { numericMonthToString } from "@/utils/dateManagement";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import {
  ComponentPropsWithoutRef,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

/**
 * DateInput component provides a custom-styled date picker.
 * It displays the selected date in a human-readable format (Day Month)
 * and triggers the native browser date picker when clicked.
 * 
 * @param {ComponentPropsWithoutRef<"input">} props - Standard HTML input properties.
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to access the underlying input element.
 */
export const DateInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>((props, ref) => {
  // Internal ref to interact with the hidden native date input
  const localRef = useRef<HTMLInputElement>(null);
  
  // Exposes the internal input ref to the parent component
  useImperativeHandle(ref, () => localRef.current!);

  /**
   * Programmatically opens the native browser date picker.
   */
  const handleDatePicker = () => {
    if (localRef.current) {
      localRef.current.showPicker();
    }
  };

  return (
    <div className={styles.container}>
      <label>Echéance</label>
      <div className={styles.inputContainer} onClick={handleDatePicker}>
        <div className={styles.text}>
          {/* 
              Parses the ISO date string (YYYY-MM-DD) to display 
              the day and the translated month name.
          */}
          {typeof props.value === "string" && (
            <span>
              {props.value.split("-")[2]}{" "}
              {numericMonthToString[parseInt(props.value.split("-")[1])]}
            </span>
          )}
          <CalendarIcon />
        </div>
        <input type="date" ref={localRef} className={styles.date} aria-label="Sélectionner une date" {...props} />
      </div>
    </div>
  );
});

DateInput.displayName = "DateInput";

export default DateInput;
