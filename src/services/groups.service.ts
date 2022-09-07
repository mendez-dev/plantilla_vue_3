import network from "../repositories/network_repository/network_repository";

const getAll = async () => {
  const response = await network.get("/v1/group");
  return response;
};

export default {
  getAll,
};
