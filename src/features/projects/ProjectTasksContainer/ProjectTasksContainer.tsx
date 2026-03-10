"use client";

import styles from "./ProjectTasksContainer.module.css";
import Chips from "@/components/Chips/Chips";
import TaskIcon from "@/components/Icons/TaskIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar/SearchBar";
import SelectInput from "@/components/Inputs/SelectInput/SelectInput";

const ChipsOptions = [
  { text: "Liste", value: "list", Icon: TaskIcon },
  { text: "Calendrier", value: "calendar", Icon: CalendarIcon },
];

export default function ProjectTasksContainer() {
  const searchParams = useSearchParams();
  const viewType = searchParams.get("view") || "list";

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>Tâches</h2>
        <p>Par ordre de priorité</p>
      </div>

      <div className={styles.controls}>
        <span>
          {ChipsOptions.map((option) => (
            <Chips
              key={option.value}
              text={option.text}
              Icon={option.Icon}
              isActive={viewType === option.value}
            />
          ))}
        </span>

        <SelectInput>
          <option value="">Statut</option>
        </SelectInput>

        <SearchBar />
      </div>
    </section>
  );
}
