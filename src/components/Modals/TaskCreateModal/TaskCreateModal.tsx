import TextInput from "@/components/Inputs/TextInput/TextInput";
import DateInput from "@/components/Inputs/DateInput/DateInput";
import StatusInput from "@/components/Inputs/StatusInput/StatusInput";
import AssigneeInput from "@/components/Inputs/MemberInputs/AssigneeInput/AssigneeInput";
import styles from "./TaskCreateModal.module.css";
import { useForm, Controller } from "react-hook-form";
import { TaskInput } from "@/models/tasks.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskInputSchema } from "@/schemas/tasks.schema";

export default function TaskCreateModal() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(TaskInputSchema),
    defaultValues: {
      title: "",
      description: "",
      assigneeIds: [],
      dueDate: new Date().toISOString().split("T")[0],
      priority: "MEDIUM",
      status: "TODO",
    },
  });

  return (
    <form className={styles.container}>
      <h2>Créer une tâche</h2>

      <TextInput label="Titre*" {...register("title")} />

      <TextInput label="Description*" {...register("description")} />

      <Controller 
        control={control}
        name="dueDate"
        render={({field}) => <DateInput {...field} />}
      />

      {/* <AssigneeInput /> */}

      <Controller
        control={control}
        name="status"
        render={({field}) => <StatusInput {...field} />}
      />
    </form>
  );
}
