import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const API_URL_ADMIN = "api/admin/";

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_ADMIN + "get-users", config);
  return response.data;
};

const blockUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL_ADMIN}block-user?id=${id}`,config);
  return response.data;
};

const userService = {
  getUsers,
  blockUser,
};

export default userService;
