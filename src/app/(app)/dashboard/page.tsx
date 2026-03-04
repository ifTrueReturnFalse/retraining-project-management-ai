import styles from "./Dashboard.module.css";
import Button from "@/components/Inputs/Button/Button";
import Chips from "@/components/Chips/Chips";
import { ChipsProps } from "@/components/Chips/Chips";
import TaskIcon from "@/components/Icons/TaskIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

const chipsOptions: ChipsProps[] = [
  { text: "Liste", Icon: TaskIcon },
  { text: "Kanban", Icon: CalendarIcon },
];

export default function DashboardPage() {
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
            <Chips key={option.text} text={option.text} Icon={option.Icon} />
          ))}
        </div>
      </section>
    </>
  );
}
