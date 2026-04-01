'use client'

import styles from "./DashProjHead.module.css";
import Button from "../Inputs/Button/Button";
import { useModalStore } from "@/store/modalStore";

interface DashProjHeadProps {
  title: string;
  description: string;
}

export default function DashProjHead({
  title,
  description,
}: DashProjHeadProps) {
  const { open } = useModalStore();

  return (
    <section className={styles.container}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div>
        <Button
          textButton="+ Créer un projet"
          onClick={() => open({ type: "PROJECT_CREATE", data: null })}
        />
      </div>
    </section>
  );
}
