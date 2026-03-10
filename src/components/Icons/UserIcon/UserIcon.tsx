import styles from "./UserIcon.module.css";
import Link from "next/link";
import classNames from "classnames";
import routes from "@/utils/routes";

interface UserIconProps {
  isActive: boolean;
}

export default function UserIcon({ isActive }: UserIconProps) {
  return (
    <Link
      href={routes.ACCOUNT}
      className={classNames(`${styles.container}`, {
        [styles.isActive]: isActive,
      })}
    >
      User
    </Link>
  );
}
