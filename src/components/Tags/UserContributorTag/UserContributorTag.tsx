import styles from "./UserContributor.module.css";
import Tag from "../Tag/Tag";
import classNames from "classnames";

interface UserContributorTagProps {
  userName: string;
  isOwner?: boolean;
}

export default function UserContributorTag({
  userName,
  isOwner = false,
}: UserContributorTagProps) {
  return (
    <Tag className={classNames(styles.baseColor, { [styles.owner]: isOwner })}>
      {userName}
    </Tag>
  );
}
