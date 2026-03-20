"use client";

import { createContext, useState, useContext } from "react";
import { UserProfile } from "@/models/auth.model";

type UserContextType = {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserProfile | null;
}) => {
  const [user, setUser] = useState<UserProfile | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};

export const useRequiredUser = () => {
  const context = useUser();

  if (!context.user) {
    throw new Error(
      "useRequiredUser must be used in a protected route where user is guaranteed.",
    );
  }

  return context as UserContextType & { user: UserProfile };
};
