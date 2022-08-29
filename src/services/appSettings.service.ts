import network from "../repositories/network_repository/network_repository";
import AppSettings from "../models/Settings/AppSettings";

/**
 * Obtenemos la informacion de la configuracion de la aplicacion
 *
 * @returns {Promise<AxiosResponse<any, any>>}
 */
const getAppSettings = async () => {
  const response = await network.get("/v1/app_settings");
  return response;
};

/**
 * Actualizamos la informacion de la configuracion de la aplicacion
 */
const updateAppSettings = async (data: AppSettings) => {
  const response = await network.put("/v1/app_settings", data);
  return response;
};

export default {
  getAppSettings,
  updateAppSettings,
};
