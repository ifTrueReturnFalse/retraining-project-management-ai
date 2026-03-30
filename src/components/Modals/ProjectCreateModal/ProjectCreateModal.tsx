import styles from "./ProjectCreateModal.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import Button from "@/components/Inputs/Button/Button";
import ContributorInput from "@/components/Inputs/MemberInputs/ContributorInput/ContributorInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectInput } from "@/models/project.model";
import { CreateProjectInputSchema } from "@/schemas/project.schema";

interface ProjectCreateModalProps {
  closeModal: () => void;
}

export default function ProjectCreateModal({}: ProjectCreateModalProps) {
  const { register, handleSubmit, control } = useForm<CreateProjectInput>({
    resolver: zodResolver(CreateProjectInputSchema),
    defaultValues: {
      title: "",
      description: "",
      contributors: []
    }
  });

  return (
    <form className={styles.container}>
      <h2>Créer un projet</h2>

      <TextInput label="Titre*" {...register("title")} />

      <TextInput label="Description*" {...register("description")} />

      <Controller
        control={control}
        name="contributors"
        render={({ field, fieldState }) => (
          <div>
            <ContributorInput
              selectedIds={field.value}
              onChange={field.onChange}
            />
            {fieldState.error && <span>{fieldState.error.message}</span>}
          </div>
        )}
      />

      <Button textButton="Ajouter un projet" className={styles.button} />
    </form>
  );
}
