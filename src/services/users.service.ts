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
      firstname: query,
      lastname: query,
    },
  });
  return response;
};

export default {
  getUsers,
};
