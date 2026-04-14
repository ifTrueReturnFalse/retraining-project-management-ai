import styles from "./SingleProjectOverview.module.css";
import Button from "@/components/Inputs/Button/Button";
import AIButton from "@/components/AIButton/AIButton";
import IconButton from "@/components/Inputs/IconButton/IconButton";
import { Project } from "@/models/project.model";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";
import { useRequiredUser } from "@/context/UserContext";

interface SingleProjectOverviewProps {
  project: Project;
}

export default function SingleProjectOverview({
  project,
}: SingleProjectOverviewProps) {
  const { open } = useModalStore();
  const router = useRouter();
  const { user } = useRequiredUser();

  return (
    <div className={styles.head}>
      <IconButton
        className={styles.backButton}
        onClick={() => router.push(routes.PROJECT_LIST)}
      >
        &larr;
      </IconButton>
      <div className={styles.projectDetail}>
        <div className={styles.titleEdit}>
          <h2>{project.name}</h2>
          {user.id === project.ownerId && (
            <p onClick={() => open({ type: "PROJECT_UPDATE", data: project })}>
              Modifier
            </p>
          )}
        </div>
        <p className={styles.description}>{project.description}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          textButton="Créer une tâche"
          onClick={() => open({ type: "TASK_CREATE", data: project })}
        />
        <AIButton
          isLarge={true}
          onClick={() => open({ type: "TASK_CREATE_AI", data: project })}
        />
      </div>
    </div>
  );
}
