'use client'

import useKeyboardLogout from "@/hooks/useKeyboardLogout";

/**
 * KeyboardManager component
 * 
 * This component acts as a global event listener provider for keyboard-based actions.
 * It does not render any UI elements (`return null`).
 * 
 * @returns {null} This component renders nothing to the DOM.
 */
export default function KeyboardManager() {
  // Initialize the custom hook that listens for specific key combinations (e.g., Ctrl+Shift+L) to trigger logout
  useKeyboardLogout();

  return null;
}
