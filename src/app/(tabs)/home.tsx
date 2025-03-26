import React, { useState, useCallback, useEffect } from "react";
import { Stack } from "expo-router";
import {
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "@/src/components/SearchBar";
import { LocationSuggestions } from "@/src/components/LocationSuggestions";
import { useWeatherAction } from "@/src/hooks/useWeatherAction";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema, SearchFormData } from "@/src/schemas/searchSchema";
import {
  useLocationSuggestion,
  useSearchBarStore,
  useWeatherStore,
} from "@/src/store/useStore";
import { WeatherCard } from "@/src/components/WeatherCard";
import { WeeklyForecast } from "@/src/components/WeeklyForecast";

const Home = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const { showSearchBar, setShowSearchBar } = useSearchBarStore();
  const { suggestions, setSuggestions } = useLocationSuggestion();
  const { forecast, setForecast } = useWeatherStore();

  const { control, handleSubmit, setValue } = useForm<SearchFormData>({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const { forecastMutation, locationMutation, forecastByCoordinatesMutation } =
    useWeatherAction();

  // Fetch weather data by city name
  const handleSearch = useCallback(
    async (cityName: string) => {
      setShowSearchBar(false);
      try {
        const forecastData = await forecastMutation.mutateAsync({
          cityName,
          days: 7,
        });
        setForecast(forecastData);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch weather data");
        console.error("Search error:", error);
      }
    },
    [forecastMutation, setForecast, setShowSearchBar]
  );

  // Handle search suggestions
  const handleSearchSuggestion = useCallback(
    handleSubmit(async (data) => {
      if (!data.searchQuery || data.searchQuery?.length === 0) {
        return setShowSearchBar(false);
      } else if (data.searchQuery.length > 2) {
        try {
          const suggestionsList = await locationMutation.mutateAsync({
            cityName: data.searchQuery,
          });
          setSuggestions(suggestionsList);
        } catch (error) {
          console.error("Suggestion error:", error);
        }
      }
    }),
    [handleSubmit, locationMutation, setSuggestions, setShowSearchBar]
  );

  // Get user's current location and fetch weather
  const getLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please allow location access to get weather information."
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const forecastData = await forecastByCoordinatesMutation.mutateAsync({
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
        days: 7,
      });

      setForecast(forecastData);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get location");
    }
  }, [forecastByCoordinatesMutation, setForecast]);

  // Load weather for current location on first render
  useEffect(() => {
    if (!forecast) {
      getLocation();
    }
  }, []);

  // Handle location selection from suggestions
  const handleLocationSelect = useCallback(
    (selectedCityName: string) => {
      handleSearch(selectedCityName);
      setValue("searchQuery", selectedCityName);
    },
    [handleSearch, setValue]
  );

  // Handle tap outside search area
  const handleOutsidePress = useCallback(() => {
    if (showSearchBar) {
      setShowSearchBar(false);
    }
  }, [showSearchBar, setShowSearchBar]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#dbeafe" },
          headerTintColor: " #1f2937",
        }}
      />
      <SafeAreaView className="flex-1 bg-blue-100 !overflow-auto">
        <View className="px-4 py-5">
          <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View>
              <View
                className={`!z-50 mb-2 transition-all duration-500 ease-in-out ${
                  showSearchBar
                    ? "translate-y-0 translate-x-0"
                    : "-translate-y-2 translate-x-1"
                }`}
              >
                {showSearchBar ? (
                  <View className="relative w-full flex -mt-2">
                    <SearchBar
                      control={control}
                      onSearch={handleSearchSuggestion}
                      onLocationPress={getLocation}
                      hasLocation={!!location}
                    />
                    {suggestions.length !== 0 && (
                      <LocationSuggestions
                        locations={suggestions}
                        onSelectLocation={handleLocationSelect}
                      />
                    )}
                  </View>
                ) : (
                  <View className="flex-row justify-end items-center">
                    <TouchableOpacity
                      onPress={() => setShowSearchBar(true)}
                      className="bg-blue-600 px-3 py-2.5 rounded-full"
                    >
                      <FontAwesome name="search" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Weather Card Component */}
              <WeatherCard forecast={forecast} />
            </View>
          </TouchableWithoutFeedback>

          {/* Weekly Forecast Component */}
          <WeeklyForecast forecast={forecast?.forecast?.forecastday} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
