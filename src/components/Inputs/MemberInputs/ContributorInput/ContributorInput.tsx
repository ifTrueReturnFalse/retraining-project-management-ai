"use client";

import { useMemo } from "react";
import { useAllContributors } from "@/hooks/useProjects";
import MemberInput from "../MemberInput/MemberInput";

interface ContributorInputProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function ContributorInput({
  selectedIds,
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
      selectedIds={selectedIds}
      onChange={onChange}
    />
  );
}
