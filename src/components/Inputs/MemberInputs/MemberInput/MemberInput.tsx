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

/**
 * MemberInput component provides a multi-select dropdown for choosing team members.
 * 
 * @param {ContributorInputProps} props - The properties for the MemberInput component.
 * @param {BasicUserProfile[]} props.selectedUsers - List of currently selected users.
 * @param {Function} props.onChange - Callback triggered when the selection changes.
 * @param {BasicUserProfile[]} props.members - List of all available members to choose from.
 */
export default function MemberInput({
  selectedUsers,
  onChange,
  members,
  label,
}: ContributorInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the selection status of a user.
   * If the user is already selected, they are removed; otherwise, they are added.
   */
  const handleToggle = (user: BasicUserProfile) => {
    // Check if the user is already in the selected list by comparing IDs
    const isAlreadySelected = selectedUsers.some((u) => u.id === user.id)

    // Create a new array to maintain immutability for React state updates
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
            {/* Dynamic label based on the number of selected items */}
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
