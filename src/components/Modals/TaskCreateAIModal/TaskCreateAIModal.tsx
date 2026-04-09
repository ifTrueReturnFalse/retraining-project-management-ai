import { Project } from "@/models/project.model";
import styles from "./TaskCreateAIModal.module.css";
import StarIcon from "@/components/Icons/StarIcon";
import { useProjectTasks } from "@/hooks/useTasks";
import AITextInput from "@/components/Inputs/AITextInput/AITextInput";
import { useState } from "react";
import { TaskService } from "@/services/tasks.service";
import { toast } from "sonner";
import { GeneratedTask } from "@/models/tasks.model";
import AITask from "@/components/AITask/AITask";
import Button from "@/components/Inputs/Button/Button";

interface TaskCreateAIModalProps {
  project: Project;
}

export default function TaskCreateAIModal({ project }: TaskCreateAIModalProps) {
  const { tasks, isLoading, refreshTasks } = useProjectTasks(project.id);
  const [prompt, setPrompt] = useState("");
  const [generatingTasks, setGeneratingTasks] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneratingTasks(true);
    try {
      if (isLoading || prompt.length === 0) return;

      const response = await TaskService.generateTasks({
        project,
        tasks,
        userRequest: prompt,
      });

      setGeneratedTasks(response.tasks);
      setPrompt("");
    } catch {
      toast.error("La génération a échoué");
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

  return (
    <form className={styles.container} onSubmit={(event) => onSubmit(event)}>
      <h2>
        <StarIcon className={styles.star} />
        &nbsp; {generatedTasks.length > 0 ? "Vos tâches..." : "Créer une tâche"}
      </h2>

      <div className={styles.chatContainer}>
        {generatedTasks.map((task, i) => (
          <AITask
            key={crypto.randomUUID()}
            task={task}
            updateTask={(updatedTask) => updateTask(i, updatedTask)}
            deleteTask={() => deleteTask(i)}
          />
        ))}

        {generatedTasks.length > 0 && (
          <Button
            textButton="+ Ajouter des tâches"
            className={styles.addButton}
          />
        )}
      </div>

      <AITextInput
        disabled={isLoading || generatingTasks}
        isLoading={generatingTasks}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
      />
    </form>
  );
}
