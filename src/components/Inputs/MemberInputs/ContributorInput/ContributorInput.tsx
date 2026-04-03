"use client";

import { useMemo } from "react";
import { useAllContributors } from "@/hooks/useProjects";
import MemberInput from "../MemberInput/MemberInput";
import { BasicUserProfile } from "@/models/auth.model";

interface ContributorInputProps {
  selectedUsers: BasicUserProfile[];
  onChange: (users: BasicUserProfile[]) => void;
}

export default function ContributorInput({
  selectedUsers,
  onChange,
}: ContributorInputProps) {
  const { users } = useAllContributors();

  const allContributors = useMemo(() => {
    return users ? users : [];
  }, [users]);

  return (
    <MemberInput
      label="Contributeurs"
      members={allContributors}
      selectedUsers={selectedUsers}
      onChange={onChange}
    />
  );
}
