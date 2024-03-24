export interface RoleRoot {
  success: boolean;
  message: string;
  data: RoleDaum[];
}

export interface RoleDaum {
  id: number;
  uuid: string;
  title: string;
  progTitle: string;
  description: string;
  created_at: string;
  updated_at: string;
  permission: Permission[];
}

export interface Permission {
  id: number;
  uuid: string;
  title: string;
  progTitle: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RoleShowResponse {
  success: boolean;
  message: string;
  data: RoleDaum;
}

export interface RoleShowModel {
  role_uuid: string | undefined;
  access_token: string;
}
export interface PermissionsByRoleDaum {
  id: number;
  uuid: string;
  title: string;
  progTitle: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
}

export interface PermissionsByRoleIdResponse {
  success: boolean;
  message: string;
  data: PermissionsByRoleDaum;
}
