import network from "../repositories/network_repository/network_repository";

const getAll = async () => {
  return await network.get("/v1/permission");
};

export default {
  getAll,
};
