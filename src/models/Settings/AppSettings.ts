/**
 * Clase que representa los ajustes de la aplicación
 */

export default class AppSettings {
  id_settings: string;
  app_name: string;
  default_tax: number;
  default_currency: string;
  primary_color: string;
  dark_primary_color: string;
  primary_color_variant: string;
  dark_primary_color_variant: string;
  secondary_color: string;
  dark_secondary_color: string;
  secondary_color_variant: string;
  dark_secondary_color_variant: string;
  background_color: string;
  dark_background_color: string;
  surface_color: string;
  dark_surface_color: string;
  error_color: string;
  dark_error_color: string;
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
    primary_color: string,
    dark_primary_color: string,
    primary_color_variant: string,
    dark_primary_color_variant: string,
    secondary_color: string,
    dark_secondary_color: string,
    secondary_color_variant: string,
    dark_secondary_color_variant: string,
    background_color: string,
    dark_background_color: string,
    surface_color: string,
    dark_surface_color: string,
    error_color: string,
    dark_error_color: string,
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
    this.primary_color = primary_color;
    this.dark_primary_color = dark_primary_color;
    this.primary_color_variant = primary_color_variant;
    this.dark_primary_color_variant = dark_primary_color_variant;
    this.secondary_color = secondary_color;
    this.dark_secondary_color = dark_secondary_color;
    this.secondary_color_variant = secondary_color_variant;
    this.dark_secondary_color_variant = dark_secondary_color_variant;
    this.background_color = background_color;
    this.dark_background_color = dark_background_color;
    this.surface_color = surface_color;
    this.dark_surface_color = dark_surface_color;
    this.error_color = error_color;
    this.dark_error_color = dark_error_color;
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
      response.primary_color,
      response.dark_primary_color,
      response.primary_color_variant,
      response.dark_primary_color_variant,
      response.secondary_color,
      response.dark_secondary_color,
      response.secondary_color_variant,
      response.dark_secondary_color_variant,
      response.background_color,
      response.dark_background_color,
      response.surface_color,
      response.dark_surface_color,
      response.error_color,
      response.dark_error_color,
      response.created_by,
      response.created_at,
      response.updated_by,
      response.updated_at,
      response.deleted_by,
      response.deleted_at
    );
  }
}
