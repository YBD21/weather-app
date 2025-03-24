import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ForecastParams,
  getForecast,
  getlocation,
  LocationParams,
} from "../services";

export const useWeatherAction = () => {
  const queryClient = useQueryClient();

  const forecastMutation = useMutation<any, unknown, ForecastParams>({
    mutationFn: getForecast,
    onSuccess: (data) => {
      queryClient.setQueryData(["forecast", data.cityName], data);
    },
  });

  const locationMutation = useMutation<any, unknown, LocationParams>({
    mutationFn: getlocation,
    onSuccess: (data) => {
      queryClient.setQueryData(["location", data.cityName], data);
    },
  });

  return {
    forecastMutation,
    locationMutation,
  };
};
