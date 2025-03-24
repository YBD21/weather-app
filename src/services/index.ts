import { apiKey } from "../constants";
import client from "./axiosClient";

export interface ForecastParams {
  cityName: string;
  days: number;
}

export interface LocationParams {
  cityName: string;
}

export const getForecast = async ({
  cityName,
  days,
}: ForecastParams): Promise<any> => {
  const response = await client().get(
    `/forecast.json?key=${apiKey}&q=${cityName}&days=${days}&aqi=no&alerts=no`
  );
  return response.data;
};

export const getlocation = async ({ cityName }: LocationParams) => {
  const response = await client().get(
    `/search.json?key=${apiKey}&q=${cityName}`
  );
  return response.data;
};
