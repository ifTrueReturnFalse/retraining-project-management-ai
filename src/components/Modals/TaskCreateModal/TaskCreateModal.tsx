import TextInput from "@/components/Inputs/TextInput/TextInput";
import DateInput from "@/components/Inputs/DateInput/DateInput";
import StatusInput from "@/components/Inputs/StatusInput/StatusInput";
import styles from "./TaskCreateModal.module.css";
import { useForm, Controller } from "react-hook-form";
import { TaskInputFront } from "@/models/tasks.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskInputFrontSchema } from "@/schemas/tasks.schema";
import { Project } from "@/models/project.model";
import { useMemo, useState } from "react";
import MemberInput from "@/components/Inputs/MemberInputs/MemberInput/MemberInput";
import Button from "@/components/Inputs/Button/Button";
import { TaskService } from "@/services/tasks.service";
import { useProjectTasks } from "@/hooks/useTasks";
import { ApiError } from "@/models/api.model";

interface TaskCreateModalProps {
  project: Project;
  closeModal: () => void;
}

export default function TaskCreateModal({
  project,
  closeModal,
}: TaskCreateModalProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInputFront>({
    resolver: zodResolver(TaskInputFrontSchema),
    defaultValues: {
      title: "",
      description: "",
      assignees: [],
      dueDate: new Date().toISOString().split("T")[0],
      priority: "MEDIUM",
      status: "TODO",
    },
  });

  const [error, setError] = useState("");
  const { refreshTasks } = useProjectTasks(project.id);

  const projectMembers = useMemo(() => {
    if (!project) return [];

    return [...project.members.map((member) => member.user)];
  }, [project]);

  const onSubmit = async (data: TaskInputFront) => {
    setError("");
    try {
      const { assignees, ...restOfData } = data;
      const payload = {
        ...restOfData,
        assigneeIds: assignees.map((assignee) => assignee.id),
        dueDate: new Date(data.dueDate).toISOString(),
      };

      const response = await TaskService.postTask(project.id, payload);

      if (response.success) {
        refreshTasks();
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
      <h2>Créer une tâche</h2>

      <TextInput
        label="Titre*"
        {...register("title")}
        error={errors.title?.message}
      />

      <TextInput
        label="Description*"
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
        render={({ field }) => (
          <div>
            <MemberInput
              label="Assigné à :"
              members={projectMembers}
              selectedUsers={field.value}
              onChange={field.onChange}
            />
            {errors.assignees?.message && (
              <span className={styles.errors}>{errors.assignees?.message}</span>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="status"
        render={({ field }) => <StatusInput {...field} />}
      />

      <Button
        textButton="+ Ajouter une tâche"
        isSubmit={true}
        className={styles.addButton}
      />

      {error && <span className={styles.errors}>{error}</span>}
    </form>
  );
}
