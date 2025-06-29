import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermissions";

type useCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: useCanParams) {
  const { user, isAuthenticated } = useContext(authContext);

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}
