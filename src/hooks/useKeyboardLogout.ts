"use client";

import { useEffect } from "react";
import { authService } from "@/services/auth.client.service";
import { useRouter } from "next/navigation";

/**
 * Custom hook that listens for a specific keyboard shortcut (Ctrl + Shift + L)
 * to trigger a global logout and redirect the user to the login page.
 */
export const useKeyboardLogout = () => {
  const router = useRouter();

  useEffect(() => {
    /**
     * Event handler for keydown events.
     * Checks for the combination: Ctrl + Shift + L
     */
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        try {
          // Call the authentication service to clear session/cookies
          await authService.logout();
          router.push("/login");
        } catch (error) {
          console.error("Failed to logout", error);
        }
      }
    };

    // Register the event listener on the window object
    window.addEventListener("keydown", handleKeyDown);
    // Cleanup: remove the listener when the component unmounts to prevent memory leaks
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);
};

export default useKeyboardLogout;
