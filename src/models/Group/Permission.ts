/**
 * Crear un modelo con las siguientes propiedades:
 *
 * created_at: "2022-09-20 11:44:18"
 * created_by: "d40ce033-390b-11ed-b122-a029190c1da2"
 * deleted_at: null
 * deleted_by: null
 * depends_on: null
 * description: "Permite ver los usuarios registrados en el sistema"
 * icon: "fa-solid fa-eye"
 * id_menu: "da44934e-390b-11ed-b122-a029190c1da2"
 * id_permission: "da458d46-390b-11ed-b122-a029190c1da2"
 * is_active: 1
 * label: "Ver usuarios"
 * name: "USER_READ"
 * type: "ALL"
 * updated_at: "2022-09-20 11:44:18"
 * updated_by: "d40ce033-390b-11ed-b122-a029190c1da2"
 */

/**
 * Clase que representa un permiso
 */
export default class Permission {
  id_permission: string;
  name: string;
  label: string;
  description: string;
  type: string;
  icon: string;
  is_active: boolean;
  depends_on: string | null;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
  children: Permission[] | undefined | null;
  selected: boolean | null | undefined;

  constructor(
    id_permission: string,
    name: string,
    label: string,
    description: string,
    type: string,
    icon: string,
    is_active: boolean,
    depends_on: string | null,
    created_by: string,
    created_at: string,
    updated_by: string,
    updated_at: string,
    deleted_by: string,
    deleted_at: string,
    children: Permission[] | undefined | null,
    selected: boolean | null | undefined
  ) {
    this.id_permission = id_permission;
    this.name = name;
    this.label = label;
    this.description = description;
    this.type = type;
    this.icon = icon;
    this.is_active = is_active;
    this.depends_on = depends_on;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.deleted_by = deleted_by;
    this.deleted_at = deleted_at;
    this.children = children ? children : null;
    this.selected = selected ? selected : null;
  }

  public static fromJson(json: string): Permission {
    const response = JSON.parse(json);
    return new Permission(
      response.id_permission,
      response.name,
      response.label,
      response.description,
      response.type,
      response.icon,
      response.is_active,
      response.depends_on,
      response.created_by,
      response.created_at,
      response.updated_by,
      response.updated_at,
      response.deleted_by,
      response.deleted_at,
      response.children,
      response.selected
    );
  }
}
