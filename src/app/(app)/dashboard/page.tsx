"use client";

import styles from "./Dashboard.module.css";
import Chips from "@/components/Chips/Chips";
import TaskIcon from "@/components/Icons/TaskIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ListView from "@/features/dashboard/ListView/ListView";
import KanbanView from "@/features/dashboard/KanbanView/KanbanView";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import DashProjHead from "@/components/DashProjHead/DashProjHead";
import { useRequiredUser } from "@/context/UserContext";
import { useAssignedTasks } from "@/hooks/useTasks";
import ModalManager from "@/components/Modals/ModalManager/ModalManager";

/**
 * Configuration for the view switcher chips.
 */
const chipsOptions = [
  { text: "Liste", value: "list", Icon: TaskIcon },
  { text: "Kanban", value: "kanban", Icon: CalendarIcon },
];

/**
 * DashboardPage Component
 * 
 * Displays the user's assigned tasks in either a List or Kanban view.
 * It manages the view state via URL search parameters to allow for 
 * shareable links and browser history support.
 */
export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useRequiredUser();
  const { tasks } = useAssignedTasks();

  // Extract the current view from URL params, defaulting to 'list'
  const viewType = searchParams.get("view") || "list";

  /**
   * Updates the URL search parameters when a view chip is clicked.
   * 
   * @param view - The selected view type ('list' | 'kanban')
   */
  const handleChipClick = (view: string) => {
    const params = new URLSearchParams();
    /* Using URLSearchParams ensures that existing params are preserved 
       if more filters are added in the future */
    params.set("view", view);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <ModalManager />

      <DashProjHead
        title="Tableau de bord"
        description={`Bonjour ${user.name}, voici un aperçu de vos projets et tâches`}
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

      {/* Conditional rendering based on the 'view' query parameter */}
      {viewType === "list" ? (
        <ListView tasks={tasks} />
      ) : (
        <KanbanView tasks={tasks} />
      )}
    </>
  );
}
