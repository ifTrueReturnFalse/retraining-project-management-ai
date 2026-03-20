import styles from "./UserIcon.module.css";
import Link from "next/link";
import classNames from "classnames";
import routes from "@/utils/routes";
import { UserProfile } from "@/models/auth.model";
import { getInitials } from "@/utils/getInitials";

interface UserIconProps {
  isActive: boolean;
  user?: UserProfile;
}

export default function UserIcon({ isActive, user }: UserIconProps) {
  if(!user) return null
  const initials = getInitials(user?.name)
  return (
    <Link
      href={routes.ACCOUNT}
      className={classNames(`${styles.container}`, {
        [styles.isActive]: isActive,
      })}
    >
      {initials}
    </Link>
  );
}
