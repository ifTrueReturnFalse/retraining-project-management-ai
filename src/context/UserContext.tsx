"use client";

import { createContext, useState, useContext } from "react";
import { UserProfile } from "@/models/auth.model";

/**
 * Type definition for the UserContext state and its modifiers.
 */
type UserContextType = {
  /** The current user profile or null if not authenticated. */
  user: UserProfile | null;
  /** Function to update the user state. */
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Provider component that wraps the application to provide user context.
 * 
 * @param children - The React nodes to be wrapped.
 * @param initialUser - The initial user state, often fetched server-side.
 */
export const UserProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserProfile | null;
}) => {
  // Initialize state with the provided initialUser (e.g., from a cookie or session)
  const [user, setUser] = useState<UserProfile | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook to access the UserContext. 
 * Throws an error if used outside of a UserProvider.
 * @returns The user object and setUser function.
 */
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};

/**
 * Specialized hook for components where a user is strictly required (e.g., Dashboard).
 * Throws an error if the user is null.
 * @returns The context with a guaranteed non-null user.
 */
export const useRequiredUser = () => {
  const context = useUser();

  if (!context.user) {
    // This prevents runtime errors in components that expect a user to exist
    throw new Error(
      "useRequiredUser must be used in a protected route where user is guaranteed.",
    );
  }

  // Type assertion to ensure TypeScript treats user as non-nullable
  return context as UserContextType & { user: UserProfile };
};
