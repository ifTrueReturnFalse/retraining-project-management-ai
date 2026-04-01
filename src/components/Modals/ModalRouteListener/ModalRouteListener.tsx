"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useModalStore } from "@/store/modalStore";

export default function ModalRouteListener() {
  const pathname = usePathname();
  const { close } = useModalStore();

  useEffect(() => {
    close();
  }, [pathname]);

  return null;
}
