"use client";

import styles from "./ProjectTaskCommentInput.module.css";
import UserTag from "@/components/Tags/UserTag/UserTag";
import Button from "@/components/Inputs/Button/Button";
import { Task, TaskCommentInput } from "@/models/tasks.model";
import { useRequiredUser } from "@/context/UserContext";
import { usePostComment } from "@/hooks/useTasks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskCommentInputSchema } from "@/schemas/tasks.schema";
import { useProjectTasks } from "@/hooks/useTasks";

interface ProjectTaskCommentInputProps {
  task: Task;
}

export default function ProjectTaskCommentInput({
  task,
}: ProjectTaskCommentInputProps) {
  const { user } = useRequiredUser();

  const { createComment, isMutating } = usePostComment({
    projectId: task.project.id,
    taskId: task.id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskCommentInput>({
    resolver: zodResolver(TaskCommentInputSchema),
    defaultValues: {
      content: "",
    },
  });

  const {refreshTasks} = useProjectTasks(task.project.id)

  const onSubmit = async (data: TaskCommentInput) => {
    try {
      await createComment(data.content);
      await refreshTasks()
      reset()
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputZone}>
        <UserTag className={styles.user} name={user.name} />
        <textarea
          placeholder="Ajouter un commentaire"
          {...register("content")}
        ></textarea>
      </div>

      <div className={styles.buttonContainer}>
        <span>{errors.content?.message}</span>
        <Button
          textButton="Envoyer"
          isSubmit={true}
          disabled={isMutating}
          className={styles.button}
        />
      </div>
    </form>
  );
}
