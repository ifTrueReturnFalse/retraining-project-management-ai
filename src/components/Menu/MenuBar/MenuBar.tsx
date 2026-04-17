"use client";

import styles from "./MenuBar.module.css";
import Image from "next/image";
import DashboardLogo from "@/components/Icons/DashboardLogo";
import FolderIcon from "@/components/Icons/FolderIcon";
import MenuItem from "../MenuItem/MenuItem";
import BurgerItem from "../BurgerItem/BurgerItem";
import UserIcon from "@/components/Icons/UserIcon/UserIcon";
import { usePathname } from "next/navigation";
import routes from "@/utils/routes";
import { useRequiredUser } from "@/context/UserContext";
import BurgerButton from "@/components/Inputs/BurgerButton/BurgerButton";
import { useState } from "react";
import classNames from "classnames";

const menuItems = [
  { text: "Tableau de bord", Icon: DashboardLogo, url: routes.DASHBOARD },
  { text: "Projets", Icon: FolderIcon, url: routes.PROJECT_LIST },
];

const burgerItems = [
  ...menuItems,
  { text: "Mon compte", Icon: null, url: routes.ACCOUNT },
];

export default function MenuBar() {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const { user } = useRequiredUser();
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  return (
    <nav className={styles.container}>
      <div className={styles.largeMenu}>
        <Image
          src={"/images/logo/orange-logo.svg"}
          alt="Logo"
          width={150}
          height={20}
          className={styles.image}
        />

        <nav className={styles.menuItems}>
          {menuItems.map((item) => (
            <MenuItem
              text={item.text}
              Icon={item.Icon}
              key={item.text}
              isActive={item.url.slice(1) === paths[1]}
              url={item.url}
            />
          ))}
        </nav>

        <UserIcon isActive={paths[1] === routes.ACCOUNT.slice(1)} user={user} />
      </div>

      <div className={styles.burgerMenu}>
        <Image
          src={"/images/logo/orange-logo.svg"}
          alt="Logo"
          width={150}
          height={20}
          className={styles.image}
        />

        <BurgerButton
          isOpen={burgerMenuOpen}
          onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
        />
        <nav
          className={classNames(styles.burgerMenuContent, {
            [styles.burgerMenuContentOpen]: burgerMenuOpen,
          })}
        >
          <div className={styles.contentWrapper}>
            {burgerItems.map((item) => (
              <BurgerItem
                key={item.text}
                text={item.text}
                url={item.url}
                isActive={item.url.slice(1) === paths[1]}
                onClick={() => setBurgerMenuOpen(false)}
              />
            ))}
          </div>
        </nav>
      </div>
    </nav>
  );
}
