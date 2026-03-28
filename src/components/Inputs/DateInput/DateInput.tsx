import styles from "./DateInput.module.css";
import { numericMonthToString } from "@/utils/dateManagement";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import {
  ComponentPropsWithoutRef,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

export const DateInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>((props, ref) => {
  const localRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => localRef.current!);

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
          {typeof props.value === "string" && (
            <span>
              {props.value.split("-")[2]}{" "}
              {numericMonthToString[parseInt(props.value.split("-")[1])]}
            </span>
          )}
          <CalendarIcon />
        </div>
        <input type="date" ref={localRef} className={styles.date} {...props} />
      </div>
    </div>
  );
});

DateInput.displayName = "DateInput";

export default DateInput;
