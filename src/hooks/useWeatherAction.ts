import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ForecastParams,
  getForecast,
  getlocation,
  LocationParams,
} from "../services";

const createMutation = <T>(
  queryClient: ReturnType<typeof useQueryClient>,
  mutationFn: (variables: T) => Promise<any>, // Ensure the function takes parameters
  queryKey: string
) => {
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.setQueryData([queryKey], data);
    },
    onError: (error) => {
      console.error(`Failed to fetch ${queryKey}:`, error);
    },
  });
};

export const useWeatherAction = () => {
  const queryClient = useQueryClient();

  const forecastMutation = createMutation<ForecastParams>(
    queryClient,
    getForecast,
    "forecast"
  );
  const locationMutation = createMutation<LocationParams>(
    queryClient,
    getlocation,
    "location"
  );

  return {
    forecastMutation,
    locationMutation,
  };
};
