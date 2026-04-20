"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useModalStore } from "@/store/modalStore";

/**
 * ModalRouteListener is a utility component that monitors navigation changes.
 * It ensures that any open modal is automatically closed when the user navigates
 * to a different route/page.
 * 
 * @returns {null} This component does not render any UI.
 */
export default function ModalRouteListener() {
  const pathname = usePathname();
  const { close } = useModalStore();

  useEffect(() => {
    // Trigger the global close action whenever the URL pathname changes
    close();
  }, [pathname]);

  // This component is purely functional for side-effects and returns nothing to the DOM
  return null;
}
