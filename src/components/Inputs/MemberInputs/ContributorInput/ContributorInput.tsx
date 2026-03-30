"use client";

import styles from "./ContributorInput.module.css";
import { useState, useMemo } from "react";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import classNames from "classnames";
import { useAllContributors } from "@/hooks/useProjects";

interface ContributorInputProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function ContributorInput({
  selectedIds,
  onChange,
}: ContributorInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { users } = useAllContributors();

  const allContributors = useMemo(() => {
    return users ? users : [];
  }, [users]);

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
          <span>{selectedIds.length === 0 ? "Choisir un ou plusieurs collaborateurs" : `${selectedIds.length} collaborateurs`}</span>
          <ArrowIcon />
        </div>

        {isOpen && (
          <ul className={styles.membersContainer}>
            {allContributors.map((member) => {
              const isSelected = selectedIds.includes(member.id);

              return (
                <li
                  key={member.id}
                  value=""
                  className={classNames({ [styles.isSelected]: isSelected })}
                  onClick={() => handleToggle(member.id)}
                >
                  <span>{member.name}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
