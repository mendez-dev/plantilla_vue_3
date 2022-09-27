import network from "../repositories/network_repository/network_repository";

const get = async (id: string) => {
  return await network.get(`/v1/group/${id}`);
};

const getAll = async () => {
  const response = await network.get("/v1/group");
  return response;
};

const getPaginated = async (
  page: number,
  records_per_page: number,
  query: string
) => {
  const response = await network.get("/v1/group", {
    params: {
      page,
      records_per_page,
      name: query.trim(),
    },
  });
  return response;
};

const create = async (group: unknown) => {
  const response = await network.post("/v1/group", group);
  return response;
};

const disable = async (id: string) => {
  const response = await network.put(`/v1/group/${id}/disable`);
  return response;
};

const enable = async (id: string) => {
  const response = await network.put(`/v1/group/${id}/enable`);
  return response;
};

const remove = async (id: string) => {
  const response = await network.delete(`/v1/group/${id}`);
  return response;
};

const assignPermissions = async (id: string, permissions: string[]) => {
  const response = await network.put(
    `/v1/group/${id}/permissions`,
    permissions
  );
  return response;
};

export default {
  get,
  getAll,
  getPaginated,
  create,
  disable,
  enable,
  remove,
  assignPermissions,
};
