import axios from "axios";

const ROOT_URL = `http://api.openweathermap.org/data/2.5/`;

const axiosClient = () => {
  return axios.create({
    baseURL: ROOT_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export default axiosClient;
