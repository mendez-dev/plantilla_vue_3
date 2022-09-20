/**
 * Clase que representa un grupo
 */

import Permission from "./Permission";

export default class Group {
  id_user_group: string;
  name: string;
  description: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
  permissions: Permission[] | undefined | null;

  constructor(
    id_user_group: string,
    name: string,
    description: string,
    is_active: boolean,
    created_by: string,
    created_at: string,
    updated_by: string,
    updated_at: string,
    deleted_by: string,
    deleted_at: string,
    permissions?: Permission[]
  ) {
    this.id_user_group = id_user_group;
    this.name = name;
    this.description = description;
    this.is_active = is_active;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.deleted_by = deleted_by;
    this.deleted_at = deleted_at;
    this.permissions = permissions ? permissions : null;
  }

  public static fromJson(json: string): Group {
    const response = JSON.parse(json);
    return new Group(
      response.id_user_group,
      response.name,
      response.description,
      response.is_active,
      response.created_by,
      response.created_at,
      response.updated_by,
      response.updated_at,
      response.deleted_by,
      response.deleted_at,
      response.permissions
        ? response.permissions.map((permission: any) =>
            Permission.fromJson(JSON.stringify(permission))
          )
        : null
    );
  }
}
