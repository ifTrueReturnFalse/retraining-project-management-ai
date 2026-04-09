import { Project } from "@/models/project.model";
import styles from "./TaskCreateAIModal.module.css";
import StarIcon from "@/components/Icons/StarIcon";
import { useProjectTasks } from "@/hooks/useTasks";
import AITextInput from "@/components/Inputs/AITextInput/AITextInput";

interface TaskCreateAIModalProps {
  project: Project;
}

export default function TaskCreateAIModal({ project }: TaskCreateAIModalProps) {
  const { tasks, isLoading, refreshTasks } = useProjectTasks(project.id);

  return (
    <form className={styles.container}>
      <h2>
        <StarIcon className={styles.star} />
        &nbsp; Créer une tâche
      </h2>

      <div className={styles.chatContainer}></div>

      <AITextInput />
    </form>
  );
}
