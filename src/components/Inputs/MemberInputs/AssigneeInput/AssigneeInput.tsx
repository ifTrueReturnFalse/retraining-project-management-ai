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

export default function AssigneeInput({
  task,
  selectedUsers,
  onChange,
}: AssigneeInputProps) {
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

  return (
    <MemberInput
      label="Assigné à :"
      members={projectMembers}
      selectedUsers={selectedUsers}
      onChange={onChange}
    />
  );
}
