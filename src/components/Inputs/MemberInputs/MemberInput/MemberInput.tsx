import styles from "./MemberInput.module.css";
import { useState } from "react";
import classNames from "classnames";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import { BasicUserProfile } from "@/models/auth.model";

interface ContributorInputProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  members: BasicUserProfile[];
  label: string;
}

export default function MemberInput({
  selectedIds,
  onChange,
  members,
  label,
}: ContributorInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (userId: string) => {
    const nextIds = selectedIds.includes(userId)
      ? selectedIds.filter((id) => id !== userId)
      : [...selectedIds, userId];

    onChange(nextIds);
  };

  return (
    <div className={styles.container}>
      <label>{label}</label>

      <div>
        <div
          className={classNames(styles.showContainer, {
            [styles.showContainerExpanded]: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {selectedIds.length === 0
              ? "Choisir un ou plusieurs collaborateurs"
              : `${selectedIds.length} collaborateurs`}
          </span>
          <ArrowIcon />
        </div>

        {isOpen && (
          <ul className={styles.membersContainer}>
            {members.map((member) => {
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
