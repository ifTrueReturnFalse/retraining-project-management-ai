import styles from "./BurgerItem.module.css";
import { MenuItemProps } from "../MenuItem/MenuItem";
import Link from "next/link";
import classNames from "classnames";

interface BurgerItemProps extends MenuItemProps {
  onClick: () => void;
}

export default function BurgerItem({
  text,
  url,
  isActive,
  onClick,
}: BurgerItemProps) {
  return (
    <Link
      href={url}
      className={classNames(styles.link, { [styles.active]: isActive })}
      onClick={() => onClick()}
    >
      {text}
    </Link>
  );
}
