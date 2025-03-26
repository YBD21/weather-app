import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CoordinateParams,
  ForecastParams,
  getForecast,
  getForecastByCoordinates,
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

  const forecastByCoordinatesMutation = useMutation<
    any,
    unknown,
    CoordinateParams
  >({
    mutationFn: getForecastByCoordinates,
    onSuccess: (data) => {
      queryClient.setQueryData(["forecast", `${data.lat},${data.lon}`], data);
    },
  });

  return {
    forecastMutation,
    locationMutation,
    forecastByCoordinatesMutation,
  };
};
