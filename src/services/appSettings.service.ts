import network from "../repositories/network_repository/network_repository";

const getAppSettings = async () => {
  const response = await network.get("/v1/app_settings");
  return response;
};

export default {
  getAppSettings,
};
