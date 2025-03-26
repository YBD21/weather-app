import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CoordinateParams,
  ForecastParams,
  getForecast,
  getForecastByCoordinates,
  getlocation,
  LocationParams,
} from "../services";

export const useWeather = () => {
  const queryClient = useQueryClient();

  const forecast = useMutation<any, unknown, ForecastParams>({
    mutationFn: getForecast,
    onSuccess: (data) => {
      queryClient.setQueryData(["forecast", data.cityName], data);
    },
  });

  const location = useMutation<any, unknown, LocationParams>({
    mutationFn: getlocation,
    onSuccess: (data) => {
      queryClient.setQueryData(["location", data.cityName], data);
    },
  });

  const geoForecast = useMutation<any, unknown, CoordinateParams>({
    mutationFn: getForecastByCoordinates,
    onSuccess: (data) => {
      queryClient.setQueryData(["forecast", `${data.lat},${data.lon}`], data);
    },
  });

  return {
    forecast,
    location,
    geoForecast,
  };
};
