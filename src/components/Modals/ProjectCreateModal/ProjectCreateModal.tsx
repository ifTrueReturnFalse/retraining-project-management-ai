"use client";

import styles from "./ProjectCreateModal.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import Button from "@/components/Inputs/Button/Button";
import ContributorInput from "@/components/Inputs/MemberInputs/ContributorInput/ContributorInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectInput } from "@/models/project.model";
import { CreateProjectInputSchema } from "@/schemas/project.schema";
import { useState } from "react";
import { ProjectService } from "@/services/project.service";
import { useRouter } from "next/navigation";

interface ProjectCreateModalProps {
  closeModal: () => void;
}

export default function ProjectCreateModal({}: ProjectCreateModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(CreateProjectInputSchema),
    defaultValues: {
      name: "",
      description: "",
      contributors: [],
    },
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: CreateProjectInput) => {
    setError("");
    try {
      const response = await ProjectService.createProject(data);
      if (response.success) {
        router.push(`/project/${response.data.projectId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h2>Créer un projet</h2>

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

      <Button
        textButton="Ajouter un projet"
        isSubmit={true}
        className={styles.button}
      />
      {error && <span>{error}</span>}
    </form>
  );
}
