"use client";

import styles from "./TaskUpdateModal.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import DateInput from "@/components/Inputs/DateInput/DateInput";
import AssigneeInput from "@/components/Inputs/MemberInputs/AssigneeInput/AssigneeInput";
import StatusInput from "@/components/Inputs/StatusInput/StatusInput";
import Button from "@/components/Inputs/Button/Button";
import { Task, TaskInputFront } from "@/models/tasks.model";
import { useForm, Controller } from "react-hook-form";
import { TaskInputFrontSchema } from "@/schemas/tasks.schema";
import { TaskInput } from "@/models/tasks.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskService } from "@/services/tasks.service";
import { useAssignedTasks } from "@/hooks/useTasks";
import { ApiError } from "@/models/api.model";
import { useState } from "react";

interface TaskUpdateProps {
  task: Task;
  closeModal: () => void;
}

export default function TaskUpdateModal({ task, closeModal }: TaskUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskInputFront>({
    resolver: zodResolver(TaskInputFrontSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split("T")[0],
      status: task.status,
      assignees: task.assignees.map((assignee) => assignee.user),
      priority: task.priority,
    },
  });

  const { refreshTasks } = useAssignedTasks();
  const [error, setError] = useState("");

  const onSubmit = async (data: TaskInputFront) => {
    setError("");
    try {
      const {assignees, ...restOfData} = data
      const payload = {
        ...restOfData,
        dueDate: new Date(data.dueDate).toISOString(),
        assigneeIds: assignees.map((assignee) => assignee.id)
      };

      const response = await TaskService.updateTask(
        task.project.id,
        task.id,
        payload,
      );
      if (response.success) {
        await refreshTasks();
        closeModal();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h2>Modifier</h2>
      <TextInput
        label="Titre"
        {...register("title")}
        error={errors.title?.message}
      />
      <TextInput
        label="Description"
        {...register("description")}
        error={errors.description?.message}
      />

      <Controller
        control={control}
        name="dueDate"
        render={({ field }) => <DateInput {...field} />}
      />

      <Controller
        control={control}
        name="assignees"
        render={({ field, fieldState }) => (
          <div>
            <AssigneeInput
              task={task}
              selectedUsers={field.value}
              onChange={field.onChange}
            />
            {fieldState.error && (
              <span className={styles.error}>{fieldState.error.message}</span>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <StatusInput value={field.value} onChange={field.onChange} />
        )}
      />

      <Button
        textButton="Enregistrer"
        className={styles.saveButton}
        isSubmit={true}
      />

      {error && <span className={styles.error}>{error}</span>}
    </form>
  );
}
