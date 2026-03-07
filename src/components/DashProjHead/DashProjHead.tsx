import styles from "./DashProjHead.module.css";
import Button from "../Inputs/Button/Button";

interface DashProjHeadProps {
  title: string;
  description: string;
}

export default function DashProjHead({
  title,
  description,
}: DashProjHeadProps) {
  return (
    <section className={styles.container}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div>
        <Button textButton="+ Créer un projet" />
      </div>
    </section>
  );
}
