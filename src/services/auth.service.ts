import network from "../repositories/network_repository/network_repository";
import User from "../models/User/User";

const login = async (username: string, password: string) => {
  const response = await network.post("/v1/login", { username, password });
  return response;
};

// Funcion que obtiene verifica la sesion del usuario
const verify = async () => {
  const response = await network.get("/v1/verify");
  return response;
};
export default {
  login,
  verify,
};
