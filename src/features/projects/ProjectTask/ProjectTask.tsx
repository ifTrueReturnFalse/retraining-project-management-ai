"use client";

import styles from "./ProjectTask.module.css";
import Tag from "@/components/Tags/Tag/Tag";
import UserContributorTag from "@/components/Tags/UserContributorTag/UserContributorTag";
import UserTag from "@/components/Tags/UserTag/UserTag";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import ProjectTaskComment from "../ProjectTaskComment/ProjectTaskComment";
import ProjectTaskCommentInput from "../ProjectTaskCommentInput/ProjectTaskCommentInput";
import IconButton from "@/components/Inputs/IconButton/IconButton";
import { useState } from "react";
import classNames from "classnames";

export default function ProjectTask() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={styles.container}>
      <section className={styles.head}>
        <div className={styles.taskDescription}>
          <div className={styles.titleContainer}>
            <h2>Nom de la tâche</h2>
            <Tag>A faire</Tag>
          </div>
          <p>Le descriptif de la tâche à réaliser</p>
        </div>
        <IconButton>&bull;&bull;&bull;</IconButton>
      </section>

      <section className={styles.taskDetail}>
        <p className={styles.dueDate}>
          Echéance :{" "}
          <span>
            <CalendarIcon /> 9 mars
          </span>
        </p>
        <div className={styles.assignedTo}>
          Assigné à :{" "}
          <span>
            <UserTag name="AA"  />
            <UserContributorTag userName="Un user" />
            
            <UserTag name="AA" />
            <UserContributorTag userName="Un user" />
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
          <p>Commentaires (1)</p>
          <ArrowIcon />
        </div>

        <div
          className={classNames(styles.commentsContainer, {
            [styles.commentsContainerOpen]: isOpen,
          })}
        >
          <ProjectTaskComment />
          <ProjectTaskComment />
          <ProjectTaskCommentInput />
        </div>
      </section>
    </article>
  );
}
