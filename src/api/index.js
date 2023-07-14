import axios from "../utils/axios";

export const registerUserRequest = async (userData) => {
  const { data } = await axios({
    url: `/api/v1/signup`,
    method: "POST",
    data: userData,
  });

  return data;
};

export const loginUserRequest = async (userData) => {
  const { data } = await axios({
    url: `/api/v1/login`,
    method: "POST",
    data: userData,
  });

  return data;
};
