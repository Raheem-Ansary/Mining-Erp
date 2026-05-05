"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultRole,
  getRoleDefinition,
  roleDefinitions,
  type ModuleId,
  type UserRole,
} from "@/lib/roles";

type RoleContextType = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  roleDefinition: ReturnType<typeof getRoleDefinition>;
  hasModuleAccess: (moduleId: ModuleId) => boolean;
};

const RoleContext = createContext<RoleContextType | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(defaultRole);

  useEffect(() => {
    const stored = window.localStorage.getItem("erp-role");
    if (!stored) return;
    if (roleDefinitions.some((item) => item.id === stored)) {
      setRoleState(stored as UserRole);
    }
  }, []);

  const setRole = (value: UserRole) => {
    setRoleState(value);
    window.localStorage.setItem("erp-role", value);
  };

  const value = useMemo<RoleContextType>(() => {
    const roleDefinition = getRoleDefinition(role);
    return {
      role,
      setRole,
      roleDefinition,
      hasModuleAccess: (moduleId) => roleDefinition.modules.includes(moduleId),
    };
  }, [role]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
}
