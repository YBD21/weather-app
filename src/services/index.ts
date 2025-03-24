import { apiKey } from "../constants";
import client from "./axiosClient";

export const getForecast = async (params: any) => {
  const response = await client().get(`/forecast?id=524901&appid=${apiKey}`, {
    params,
  });
  return response.data;
};

export const getlocation = async (params: any) => {
  const response = await client().get(`/search?id=524901&appid=${apiKey}`, {
    params,
  });
  return response.data;
};
