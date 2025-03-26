import axios from "axios";

const ROOT_URL = process.env.EXPO_PUBLIC_ROOT_URL as string;

const axiosClient = () => {
  return axios.create({
    baseURL: ROOT_URL,
    // withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export default axiosClient;
