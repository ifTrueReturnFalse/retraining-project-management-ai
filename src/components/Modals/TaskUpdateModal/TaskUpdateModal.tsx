import styles from "./TaskUpdateModal.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import DateInput from "@/components/Inputs/DateInput/DateInput";
import AssigneeInput from "@/components/Inputs/AssigneeInput/AssigneeInput";
import StatusInput from "@/components/Inputs/StatusInput/StatusInput";
import Button from "@/components/Inputs/Button/Button";
import { Task } from "@/models/tasks.model";
import { useForm, Controller } from "react-hook-form";
import { TaskInputSchema } from "@/schemas/tasks.schema";
import { TaskInput } from "@/models/tasks.model";
import { zodResolver } from "@hookform/resolvers/zod";

interface TaskUpdateProps {
  task: Task;
}

export default function TaskUpdateModal({ task }: TaskUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(TaskInputSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split("T")[0],
      status: task.status,
      assigneeIds: task.assignees.map((assignee) => assignee.user.id),
      priority: task.priority,
    },
  });

  const onSubmit = (data: TaskInput) => {
    try {
      const payload = {
        ...data,
        dueDate: new Date(data.dueDate).toISOString(),
      };
      console.log(payload);
    } catch (error) {
      console.error(error);
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
        name="assigneeIds"
        render={({ field, fieldState }) => (
          <div>
            <AssigneeInput
              task={task}
              selectedIds={field.value}
              onChange={field.onChange}
            />
            {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
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
    </form>
  );
}
