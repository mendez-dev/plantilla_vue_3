import network from "../repositories/network_repository/network_repository";

const getUsers = async (
  page: number,
  records_per_page: number,
  query: string
) => {
  const response = await network.get("/v1/user", {
    params: {
      page,
      records_per_page,
      firstname: query.trim(),
      lastname: query.trim(),
      full_name: query.trim(),
    },
  });
  return response;
};

const create = async (user: any) => {
  const response = await network.post("/v1/user", user);
  return response;
};

const get = async (id: string) => {
  const response = await network.get(`/v1/user/${id}`);
  return response;
};

const update = async (id: string, user: any) => {
  const response = await network.put(`/v1/user/${id}`, user);
  return response;
};

const disable = async (id: string) => {
  const response = await network.put(`/v1/user/${id}/disable`);
  return response;
};

const enable = async (id: string) => {
  const response = await network.put(`/v1/user/${id}/enable`);
  return response;
};

const remove = async (id: string) => {
  const response = await network.delete(`/v1/user/${id}`);
  return response;
};

const changePassword = async (id: string, password: string) => {
  const response = await network.put(`/v1/user/${id}/password`, {
    password,
  });
  return response;
};

export default {
  getUsers,
  create,
  get,
  update,
  disable,
  enable,
  remove,
  changePassword,
};
