import { Project } from "@/models/project.model";
import styles from "./TaskCreateAIModal.module.css";
import StarIcon from "@/components/Icons/StarIcon";
import { useProjectTasks } from "@/hooks/useTasks";
import AITextInput from "@/components/Inputs/AITextInput/AITextInput";
import { useState } from "react";
import { TaskService } from "@/services/tasks.service";
import { toast } from "sonner";
import { GeneratedTask, TaskInput } from "@/models/tasks.model";
import AITask from "@/components/AITask/AITask";
import Button from "@/components/Inputs/Button/Button";
import { useRequiredUser } from "@/context/UserContext";
import { ApiError } from "@/models/api.model";

interface TaskCreateAIModalProps {
  project: Project;
  closeModal: () => void;
}

export default function TaskCreateAIModal({
  project,
  closeModal,
}: TaskCreateAIModalProps) {
  const { tasks, isLoading, refreshTasks } = useProjectTasks(project.id);
  const [prompt, setPrompt] = useState("");
  const [generatingTasks, setGeneratingTasks] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
  const { user } = useRequiredUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneratingTasks(true);
    setError("");
    try {
      if (isLoading || prompt.length === 0) return;

      const response = await TaskService.generateTasks({
        project,
        tasks,
        userRequest: prompt,
      });

      setGeneratedTasks(response.tasks);
      setPrompt("");
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue.");
      }
    } finally {
      setGeneratingTasks(false);
    }
  };

  const deleteTask = (indexToDelete: number) => {
    setGeneratedTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== indexToDelete),
    );
  };

  const updateTask = (indexToUpdate: number, updatedTask: GeneratedTask) => {
    setGeneratedTasks((prevTask) =>
      prevTask.map((task, index) =>
        index === indexToUpdate ? updatedTask : task,
      ),
    );
  };

  const submitTasks = async () => {
    if (generatedTasks.length === 0) {
      toast.error("Pas de tâches à ajouter");
      return;
    }

    setIsSubmitting(true);
    const promises = generatedTasks.map(async (task) => {
      const payload: TaskInput = {
        ...task,
        assigneeIds: [user.id],
      };

      const response = await TaskService.postTask(project.id, payload);

      if (!response.success) {
        throw new Error(`Echec pour : ${task.title}`);
      }

      return task;
    });

    try {
      await Promise.all(promises);
      toast.success("Toutes les tâches ont été ajoutées");
      setGeneratedTasks([]);
      refreshTasks();
      closeModal();
    } catch {
      toast.error("Certaines tâches n'ont pas pu être ajoutées");
      refreshTasks();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={(event) => onSubmit(event)}>
      <h2>
        <StarIcon className={styles.star} />
        &nbsp; {generatedTasks.length > 0 ? "Vos tâches..." : "Créer une tâche"}
      </h2>

      <div className={styles.chatContainer}>
        {generatedTasks.map((task, i) => (
          <AITask
            key={task.title}
            task={task}
            updateTask={(updatedTask) => updateTask(i, updatedTask)}
            deleteTask={() => deleteTask(i)}
          />
        ))}

        {generatedTasks.length > 0 && (
          <Button
            textButton="+ Ajouter des tâches"
            className={styles.addButton}
            onClick={() => submitTasks()}
            disabled={isSubmitting}
          />
        )}
      </div>

      <AITextInput
        disabled={isLoading || generatingTasks}
        isLoading={generatingTasks}
        value={prompt}
        aria-label="Décrivez les tâches que vous souhaitez ajouter"
        onChange={(event) => setPrompt(event.target.value)}
      />

      {error && <p></p>}
    </form>
  );
}
