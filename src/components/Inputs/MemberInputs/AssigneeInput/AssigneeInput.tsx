"use client";

import { useMemo } from "react";
import { Task } from "@/models/tasks.model";
import { useProjectById } from "@/hooks/useProjects";
import MemberInput from "../MemberInput/MemberInput";
import { BasicUserProfile } from "@/models/auth.model";

interface AssigneeInputProps {
  task: Task;
  selectedUsers: BasicUserProfile[];
  onChange: (users: BasicUserProfile[]) => void;
}

/**
 * AssigneeInput component filters and provides a list of potential assignees for a specific task.
 * It fetches project members and ensures the list is unique.
 * 
 * @param {AssigneeInputProps} props - The properties for the AssigneeInput component.
 * @param {Task} props.task - The task object used to identify the project and current assignees.
 * @param {BasicUserProfile[]} props.selectedUsers - The currently selected users in the UI.
 * @param {Function} props.onChange - Callback triggered when the selection changes.
 */
export default function AssigneeInput({
  task,
  selectedUsers,
  onChange,
}: AssigneeInputProps) {
  // Fetch project details to get the list of members and the owner
  const { project } = useProjectById(task.project.id);

  /**
   * Computes a unique list of users who can be assigned to the task.
   * Includes the project owner, project members, and existing task assignees.
   */
  const projectMembers = useMemo(() => {
    if (!project) return [];

    // Combine all potential users into a single array
    const allUsers = [
      project.owner,
      ...project.members.map((member) => member.user),
      ...task.assignees.map((assignee) => assignee.user),
    ];

    // Use a Map to filter out duplicate users by their unique ID
    // This ensures that even if a user is both a member and an assignee, they appear once.
    return Array.from(
      new Map(allUsers.map((user) => [user.id, user])).values(),
    );
  }, [project, task.assignees]);

  return (
    <MemberInput
      label="Assigné à :"
      members={projectMembers}
      selectedUsers={selectedUsers}
      onChange={onChange}
    />
  );
}
