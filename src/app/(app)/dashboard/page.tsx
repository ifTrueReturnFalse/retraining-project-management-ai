"use client";

import styles from "./Dashboard.module.css";
import Chips from "@/components/Chips/Chips";
import TaskIcon from "@/components/Icons/TaskIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ListView from "@/features/dashboard/ListView/ListView";
import KanbanView from "@/features/dashboard/KanbanView/KanbanView";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import DashProjHead from "@/components/DashProjHead/DashProjHead";

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
      <DashProjHead
        title="Tableau de bord"
        description="Bonjour User, voici un aperçu de vos projets et tâches"
      />

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
