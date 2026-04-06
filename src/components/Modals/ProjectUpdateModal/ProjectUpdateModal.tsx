import { Project, UpdateProjectInputFront } from "@/models/project.model";
import styles from "./ProjectUpdateModal.module.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProjectInputFrontSchema } from "@/schemas/project.schema";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import ContributorInput from "@/components/Inputs/MemberInputs/ContributorInput/ContributorInput";
import Button from "@/components/Inputs/Button/Button";
import { useState } from "react";
import { ApiError } from "@/models/api.model";
import { ProjectService } from "@/services/project.service";
import { useProjectById } from "@/hooks/useProjects";

interface ProjectUpdateModalProps {
  project: Project;
  closeModal: () => void;
}

export default function ProjectUpdateModal({
  project,
  closeModal,
}: ProjectUpdateModalProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateProjectInputFrontSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      contributors: project.members.map((member) => member.user),
    },
  });

  const [error, setError] = useState("");
  const { getProject } = useProjectById(project.id);

  const onSubmit = async (data: UpdateProjectInputFront) => {
    setError("");
    try {
      const payload = {
        ...data,
        contributors: data.contributors.map((contributor) => contributor.id),
      };

      const response = await ProjectService.updateProject(project.id, payload);

      if (response.success) {
        getProject();
        closeModal()
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
      <h2>Modifier un projet</h2>

      <TextInput
        label="Titre*"
        {...register("name")}
        error={errors.name?.message}
      />

      <TextInput
        label="Description*"
        {...register("description")}
        error={errors.description?.message}
      />

      <Controller
        control={control}
        name="contributors"
        render={({ field }) => (
          <div>
            <ContributorInput
              selectedUsers={field.value}
              onChange={field.onChange}
            />
            {errors.contributors?.message && (
              <span>errors.contributors?.message</span>
            )}
          </div>
        )}
      />

      <Button
        textButton="Enregistrer"
        isSubmit={true}
        className={styles.saveButton}
      />

      {error && <span className={styles.errors}>{error}</span>}
    </form>
  );
}
