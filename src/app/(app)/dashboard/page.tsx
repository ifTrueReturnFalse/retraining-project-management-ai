"use client";

import styles from "./Dashboard.module.css";
import Button from "@/components/Inputs/Button/Button";
import Chips from "@/components/Chips/Chips";
import TaskIcon from "@/components/Icons/TaskIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ListView from "@/features/dashboard/ListView/ListView";
import KanbanView from "@/features/dashboard/KanbanView/KanbanView";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const chipsOptions = [
  { text: "Liste", value: "list", Icon: TaskIcon },
  { text: "Kanban", value: "kanban", Icon: CalendarIcon },
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const viewType = searchParams.get("view") || "list";

  const handleChipClick = (view: string) => {
    const params = new URLSearchParams();
    params.set("view", view);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <section className={styles.welcomeSection}>
        <div>
          <h1>Tableau de bord</h1>
          <p>Bonjour User, voici un aperçu de vos projets et tâches</p>
        </div>
        <div>
          <Button textButton="+ Créer un projet" />
        </div>
      </section>

      <section>
        <div className={styles.chipsContainer}>
          {chipsOptions.map((option) => (
            <Chips
              key={option.text}
              text={option.text}
              Icon={option.Icon}
              onClick={() => handleChipClick(option.value)}
              isActive={viewType === option.value}
            />
          ))}
        </div>
      </section>

      {viewType === "list" ? <ListView /> : <KanbanView />}
    </>
  );
}
