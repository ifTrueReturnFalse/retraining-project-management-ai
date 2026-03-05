"use client";

import styles from "./MenuBar.module.css";
import Image from "next/image";
import DashboardLogo from "@/components/Icons/DashboardLogo";
import FolderIcon from "@/components/Icons/FolderIcon";
import MenuItem from "../MenuItem/MenuItem";
import UserIcon from "@/components/Icons/UserIcon/UserIcon";
import { usePathname } from "next/navigation";

const menuItems = [
  { text: "Tableau de bord", Icon: DashboardLogo, url: "dashboard" },
  { text: "Projets", Icon: FolderIcon, url: "project" },
];

export default function MenuBar() {
  const pathname = usePathname();
  const paths = pathname.split("/");

  return (
    <nav className={styles.container}>
      <Image
        src={"/images/logo/orange-logo.svg"}
        alt="Logo"
        width={150}
        height={20}
      />

      <div className={styles.menuItems}>
        {menuItems.map((item) => (
          <MenuItem
            text={item.text}
            Icon={item.Icon}
            key={item.text}
            isActive={item.url === paths[1]}
            url={item.url}
          />
        ))}
      </div>

      <UserIcon isActive={paths[1] === 'account'} />
    </nav>
  );
}
