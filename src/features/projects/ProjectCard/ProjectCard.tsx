"use client";

import styles from "./ProjectCard.module.css";
import TeamIcon from "@/components/Icons/TeamIcon";
import UserTag from "@/components/Tags/UserTag/UserTag";
import Tag from "@/components/Tags/Tag/Tag";
import Link from "next/link";
import routes from "@/utils/routes";
import { Project } from "@/models/project.model";
import { useProjectTasks } from "@/hooks/useTasks";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { tasks } = useProjectTasks(project.id);
  const numberOfTasks = tasks?.length || 0;
  const numberOfTasksNotDone =
    tasks?.filter((task) => task.status !== "DONE").length || 0;
  const progress = numberOfTasksNotDone / numberOfTasks || 0;

  return (
    <Link href={routes.PROJECT(`${project.id}`)} className={styles.container}>
      <h3 className={styles.title}>{project.name}</h3>
      <p className={styles.description}>{project.description}</p>

      <div className={styles.progressPercent}>
        <p>Progression</p>
        {tasks && (
          <p>{tasks.length === 0 ? "0" : `${Math.round(progress * 100)}`}%</p>
        )}
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressor}
          style={{ "--progress": progress } as React.CSSProperties}
        ></div>
      </div>

      <p className={styles.tasks}>
        {tasks?.filter((task) => task.status !== "DONE").length}/{tasks?.length}{" "}
        tâches terminées
      </p>

      <div className={styles.team}>
        <TeamIcon />
        Equipe ({project.members.length})
      </div>

      <div className={styles.contributors}>
        <UserTag isLeader={true} name={project.owner.name} />
        <Tag className={styles.owner}>Propriétaire</Tag>
        <div className={styles.invitedContainer}>
          {project.members
            .filter((member) => member.userId !== project.ownerId)
            .map((member) => (
              <UserTag key={member.id} name={member.user.name} />
            ))}
        </div>
      </div>
    </Link>
  );
}
