import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getForecast, getlocation } from "../services";

const createMutation = (
  queryClient: ReturnType<typeof useQueryClient>,
  mutationFn: any,
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

  const forecastMutation = createMutation(queryClient, getForecast, "forecast");
  const locationMutation = createMutation(queryClient, getlocation, "location");

  return {
    forecastMutation,
    locationMutation,
  };
};
