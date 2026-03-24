import styles from "./DateInput.module.css";
import { ISODateToTaskView } from "@/utils/dateManagement";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import { ComponentPropsWithoutRef, useRef } from "react";

export default function DateInput({
  ...props
}: ComponentPropsWithoutRef<"input">) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cleanDate = typeof props.value === "string" ? props.value.split("T")[0] : ""

  const handleDatePicker = () => {
    inputRef.current?.showPicker();
  };

  return (
    <div className={styles.container}>
      <label>Echéance</label>
      <div className={styles.inputContainer} onClick={handleDatePicker}>
        <div className={styles.text}>
          {typeof props.value === "string" && (
            <span>{ISODateToTaskView(props.value)}</span>
          )}
          <CalendarIcon />
        </div>
        <input type="date" className={styles.date} {...props} value={cleanDate} ref={inputRef} />
      </div>
    </div>
  );
}
