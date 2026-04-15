"use client";

import styles from "./ProjectTask.module.css";
import StatusTag from "@/components/Tags/StatusTag/StatusTag";
import UserContributorTag from "@/components/Tags/UserContributorTag/UserContributorTag";
import UserTag from "@/components/Tags/UserTag/UserTag";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import ProjectTaskComment from "../ProjectTaskComment/ProjectTaskComment";
import ProjectTaskCommentInput from "../ProjectTaskCommentInput/ProjectTaskCommentInput";
import IconButton from "@/components/Inputs/IconButton/IconButton";
import { useState } from "react";
import classNames from "classnames";
import { Task } from "@/models/tasks.model";
import { ISODateToTaskView } from "@/utils/dateManagement";
import { useModalStore } from "@/store/modalStore";

interface ProjectTaskProps {
  task: Task;
}

export default function ProjectTask({ task }: ProjectTaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useModalStore();

  return (
    <article className={styles.container}>
      <section className={styles.head}>
        <div className={styles.taskDescription}>
          <div className={styles.titleContainer}>
            <h2>{task.title}</h2>
            <StatusTag status={task.status} />
          </div>
          <p>{task.description}</p>
        </div>
        <IconButton onClick={() => open({ type: "TASK_UPDATE", data: task })}>
          &bull;&bull;&bull;
        </IconButton>
      </section>

      <section className={styles.taskDetail}>
        <p className={styles.dueDate}>
          Echéance :{" "}
          <span>
            <CalendarIcon /> {ISODateToTaskView(task.dueDate)}
          </span>
        </p>
        <div className={styles.assignedTo}>
          Assigné à :{" "}
          <span>
            {task.assignees.map((assignee) => (
              <span key={assignee.userId}>
                <UserTag name={assignee.user.name} />
                <UserContributorTag userName={assignee.user.name} />
              </span>
            ))}
          </span>
        </div>
      </section>

      <section className={styles.commentSection}>
        <div
          className={classNames(styles.commentSectionHead, {
            [styles.commentSectionHeadOpen]: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>Commentaires ({task.comments.length})</p>
          <ArrowIcon />
        </div>

        <div
          className={classNames(styles.commentsContainer, {
            [styles.commentsContainerOpen]: isOpen,
          })}
        >
          <div className={styles.commentsContent}>
            {task.comments.map((comment) => (
              <ProjectTaskComment key={comment.id} comment={comment} />
            ))}
            <ProjectTaskCommentInput task={task} />
          </div>
        </div>
      </section>
    </article>
  );
}
