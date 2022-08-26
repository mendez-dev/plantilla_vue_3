/**
 * Clase que representa los ajustes de la aplicación
 */
export default class AppSettings {
  id_settings: string;
  app_name: string;
  default_tax: number;
  default_currency: string;
  main_color: string;
  main_dark_color: string;
  second_color: string;
  second_dark_color: string;
  accent_color: string;
  accent_dark_color: string;
  scaffold_color: string;
  scaffold_dark_color: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;

  constructor(
    id_settings: string,
    app_name: string,
    default_tax: number,
    default_currency: string,
    main_color: string,
    main_dark_color: string,
    second_color: string,
    second_dark_color: string,
    accent_color: string,
    accent_dark_color: string,
    scaffold_color: string,
    scaffold_dark_color: string,
    created_by: string,
    created_at: string,
    updated_by: string,
    updated_at: string,
    deleted_by: string,
    deleted_at: string
  ) {
    this.id_settings = id_settings;
    this.app_name = app_name;
    this.default_tax = default_tax;
    this.default_currency = default_currency;
    this.main_color = main_color;
    this.main_dark_color = main_dark_color;
    this.second_color = second_color;
    this.second_dark_color = second_dark_color;
    this.accent_color = accent_color;
    this.accent_dark_color = accent_dark_color;
    this.scaffold_color = scaffold_color;
    this.scaffold_dark_color = scaffold_dark_color;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.deleted_by = deleted_by;
    this.deleted_at = deleted_at;
  }

  public static fromJson(json: string): AppSettings {
    const response = JSON.parse(json);
    return new AppSettings(
      response.id_settings,
      response.app_name,
      response.default_tax,
      response.default_currency,
      response.main_color,
      response.main_dark_color,
      response.second_color,
      response.second_dark_color,
      response.accent_color,
      response.accent_dark_color,
      response.scaffold_color,
      response.scaffold_dark_color,
      response.created_by,
      response.created_at,
      response.updated_by,
      response.updated_at,
      response.deleted_by,
      response.deleted_at
    );
  }
}
