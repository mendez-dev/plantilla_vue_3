import Group from "../Group/Group";

/**
 * Clase que representa un usuario
 */
export default class User {
  id_user: string;
  id_user_group: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  is_active: boolean;
  picture: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
  group: Group | undefined | null;

  // getter para el nombre completo
  get fullName(): string {
    return this.firstname + " " + this.lastname;
  }

  constructor(
    id_user: string,
    id_user_group: string,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    is_active: boolean,
    picture: string,
    created_by: string,
    created_at: string,
    updated_by: string,
    updated_at: string,
    deleted_by: string,
    deleted_at: string,
    group?: Group
  ) {
    this.id_user = id_user;
    this.id_user_group = id_user_group;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.is_active = is_active;
    this.picture = picture;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.deleted_by = deleted_by;
    this.deleted_at = deleted_at;
    this.group = group ? group : null;
  }

  public static fromJson(json: string): User {
    const response = JSON.parse(json);
    return new User(
      response.id_user,
      response.id_user_group,
      response.firstname,
      response.lastname,
      response.email,
      response.username,
      response.is_active,
      response.picture,
      response.created_by,
      response.created_at,
      response.updated_by,
      response.updated_at,
      response.deleted_by,
      response.deleted_at,
      response.group
        ? Group.fromJson(JSON.stringify(response.group))
        : undefined
    );
  }
}
