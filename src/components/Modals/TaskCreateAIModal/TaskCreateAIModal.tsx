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

/**
 * Modal component that allows users to generate project tasks using AI.
 * Users can input a natural language prompt, review generated tasks, and batch-save them to the project.
 * 
 * @param {Project} project - The current project context
 * @param {Function} closeModal - Callback to close the modal
 */
export default function TaskCreateAIModal({
  project,
  closeModal,
}: TaskCreateAIModalProps) {
  // Fetch existing tasks to provide context to the AI for better generation
  const { tasks, isLoading, refreshTasks } = useProjectTasks(project.id);
  
  // UI State
  const [prompt, setPrompt] = useState("");
  const [generatingTasks, setGeneratingTasks] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
  const { user } = useRequiredUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handles the AI generation request.
   * Sends the current project state and user prompt to the TaskService.
   */
  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneratingTasks(true);
    setError("");
    try {
      if (isLoading || prompt.length === 0) return;
      // Prevent submission if tasks are still loading or prompt is empty

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

  /**
   * Removes a specific task from the local list of generated tasks before final submission.
   */
  const deleteTask = (indexToDelete: number) => {
    setGeneratedTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== indexToDelete),
    );
  };

  /**
   * Updates a specific task's details (title, description, etc.) in the local state.
   */
  const updateTask = (indexToUpdate: number, updatedTask: GeneratedTask) => {
    setGeneratedTasks((prevTask) =>
      prevTask.map((task, index) =>
        index === indexToUpdate ? updatedTask : task,
      ),
    );
  };

  /**
   * Persists all generated tasks to the database.
   * Executes multiple POST requests in parallel and refreshes the task list upon completion.
   */
  const submitTasks = async () => {
    if (generatedTasks.length === 0) {
      toast.error("Pas de tâches à ajouter");
      return;
    }

    // Map generated tasks to TaskInput format and assign current user as default assignee
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
      // Wait for all API calls to resolve; if one fails, the catch block handles the partial failure notification
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
