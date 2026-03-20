"use client";

import { useEffect } from "react";
import { authService } from "@/services/auth.client.service";
import { useRouter } from "next/navigation";

export const useKeyboardLogout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        try {
          await authService.logout();
          router.push("/login");
        } catch (error) {
          console.error("Failed to logout", error);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);
};

export default useKeyboardLogout;
