type validateUserPermissionsParams = {
  user: {
    permissions: string[];
    roles: string[];
  };
  permissions?: string[];
  roles?: string[];
};

export function validateUserPermissions({
  user,
  permissions,
  roles,
}: validateUserPermissionsParams) {
  if (permissions?.length > 0) {
    const userHasAllPermissions = permissions.every((permissions) => {
      return user?.permissions.includes(permissions);
    });

    if (!userHasAllPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const userHasAllRoles = roles.some((role) => {
      return user?.roles.includes(role);
    });

    if (!userHasAllRoles) {
      return false;
    }
  }

  return true;
}
