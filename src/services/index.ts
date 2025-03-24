import { apiKey } from "../constants";
import client from "./axiosClient";

interface ForecastParams {
  cityName: string;
  days: number;
}

interface LocationParams {
  cityName: string;
}

export const getForecast = async ({ cityName, days }: ForecastParams) => {
  const response = await client().get(
    `/forecast.json?key=${apiKey}&q=${cityName}&days=${days}&aqi=no&alerts=no`
  );
  return response.data;
};

export const getlocation = async ({ cityName }: LocationParams) => {
  const response = await client().get(
    `/forecast.json?key=${apiKey}&q=${cityName}`
  );
  return response.data;
};
