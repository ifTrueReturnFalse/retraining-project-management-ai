"use client";

import styles from "./AssigneeInput.module.css";
import { useState, useMemo } from "react";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import { Task } from "@/models/tasks.model";
import { useProjectById } from "@/hooks/useProjects";
import classNames from "classnames";

interface AssigneeInputProps {
  task: Task;
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export default function AssigneeInput({ task, selectedIds, onChange }: AssigneeInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { project } = useProjectById(task.project.id);

  const projectMembers = useMemo(() => {
    if (!project) return [];

    const allUsers = [
      project.owner,
      ...project.members.map((member) => member.user),
      ...task.assignees.map((assignee) => assignee.user),
    ];

    return Array.from(
      new Map(allUsers.map((user) => [user.id, user])).values(),
    );
  }, [project, task.assignees]);

  const handleToggle = (userId: string) => {
    const nextIds = selectedIds.includes(userId)
      ? selectedIds.filter((id) => id !== userId)
      : [...selectedIds, userId];

    onChange(nextIds);
  };

  return (
    <div className={styles.container}>
      <label>Assigné à :</label>

      <div>
        <div
          className={classNames(styles.showContainer, {
            [styles.showContainerExpanded]: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedIds.length} collaborateurs</span>
          <ArrowIcon />
        </div>

        {isOpen && (
          <ul className={styles.membersContainer}>
            {projectMembers.map((member) => {
              const isSelected = selectedIds.includes(member.id);

              return (
                <li
                  key={member.id}
                  value=""
                  className={classNames({ [styles.isSelected]: isSelected })}
                  onClick={() => handleToggle(member.id)}
                >
                  <span>{member.name}</span>
                  {member.id === project?.ownerId && <span> - Owner</span>}
                  {member.id !== project?.ownerId &&
                    !project?.members.some((m) => m.userId === member.id) && (
                      <span> - Externe</span>
                    )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
