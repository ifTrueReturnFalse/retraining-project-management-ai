import styles from "./MemberInput.module.css";
import { useState } from "react";
import classNames from "classnames";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import { BasicUserProfile } from "@/models/auth.model";

interface ContributorInputProps {
  selectedUsers: BasicUserProfile[];
  onChange: (users: BasicUserProfile[]) => void;
  members: BasicUserProfile[];
  label: string;
}

export default function MemberInput({
  selectedUsers,
  onChange,
  members,
  label,
}: ContributorInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (user: BasicUserProfile) => {
    const isAlreadySelected = selectedUsers.some((u) => u.id === user.id)

    const nextUsers = isAlreadySelected
      ? selectedUsers.filter((u) => u.id !== user.id)
      : [...selectedUsers, user];

    onChange(nextUsers);
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
            {selectedUsers.length === 0
              ? "Choisir un ou plusieurs collaborateurs"
              : `${selectedUsers.length} collaborateurs`}
          </span>
          <ArrowIcon />
        </div>

        {isOpen && (
          <ul className={styles.membersContainer}>
            {members.map((member) => {
              const isSelected = selectedUsers.some((user) => user.id === member.id);

              return (
                <li
                  key={member.id}
                  value=""
                  className={classNames({ [styles.isSelected]: isSelected })}
                  onClick={() => handleToggle(member)}
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
