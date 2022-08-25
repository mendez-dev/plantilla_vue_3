import network from "../network_repository/network_repository";

export const auth = async (username: string, password: string) => {
  const response = await network.post("/v1/login", { username, password });
  return response.data;
};
