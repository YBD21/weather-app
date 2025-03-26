import React, { useState, useCallback } from "react";
import { Stack } from "expo-router";
import {
  View,
  TouchableOpacity,
  Alert,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
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
import { weatherImages } from "@/src/constants";

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

  const handleSearch = useCallback(async (cityName: string) => {
    // Keyboard.dismiss();
    setShowSearchBar(false);
    const forcastData = await forecastMutation.mutateAsync({
      cityName,
      days: 7,
    });

    // console.log("Forecast response:", forcastData);

    setForecast(forcastData);
  }, []);

  // use debounce here
  const handleSearchSuggestion = useCallback(
    handleSubmit(async (data) => {
      if (!data.searchQuery || data.searchQuery?.length === 0) {
        return setShowSearchBar(false);
      } else if (data.searchQuery.length > 2) {
        const suggestionsList = await locationMutation.mutateAsync({
          cityName: data.searchQuery,
        });

        setSuggestions(suggestionsList);
      }
      // console.log("suggestionsList:", suggestionsList);
    }),
    []
  );

  const getLocation = async () => {
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
      // console.log("Current location:", currentLocation);
      // console.log(
      //   currentLocation.coords.latitude,
      //   currentLocation.coords.longitude
      // );

      const forcastData = await forecastByCoordinatesMutation.mutateAsync({
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
        days: 7,
      });

      setForecast(forcastData);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get location");
    }
  };

  const handleLocationSelect = useCallback(
    (selectedCityName: string) => {
      console.log("Selected location:", selectedCityName);
      handleSearch(selectedCityName);
    },
    [handleSearch, setValue]
  );

  const handleOutsidePress = () => {
    if (showSearchBar) {
      // console.log("Tapped outside search bar");
      setShowSearchBar(false);
    }
  };

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
            {/* Search Section */}
            {/* later add animation libary for this */}
            <View>
              {/* Do not remove this */}
              <View
                className={`!z-50 mb-2 transition-all duration-500 ease-in-out  ${
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
              {/* Weather Card */}
              <View className="bg-white rounded-3xl p-6 shadow-lg">
                {/* Location Info */}
                <View className="items-center mb-6">
                  <Text className="text-3xl font-bold text-gray-800">
                    {forecast?.location.name ?? "London"}
                  </Text>
                  <Text className="text-lg text-gray-600">
                    {forecast?.location.country ?? "United Kingdom"}
                  </Text>
                </View>

                {/* Weather Image */}
                <View className="items-center mb-6">
                  <Image
                    source={
                      weatherImages[
                        forecast?.current?.condition
                          ?.text as keyof typeof weatherImages
                      ] ?? weatherImages.other
                    }
                    className="!w-36 !h-36"
                  />
                </View>

                {/* Temperature */}
                <View className="items-center mb-8">
                  <Text className="text-6xl font-bold text-gray-800">
                    {`${Math.round(forecast?.current?.temp_c ?? 20)}°`}
                  </Text>
                  <Text className="text-xl text-gray-600 mt-2">
                    {forecast?.current?.condition?.text ?? "Partly Cloudy"}
                  </Text>
                </View>

                {/* Weather Stats */}
                <View className="flex-row justify-between px-6 py-4 bg-blue-50 rounded-2xl mx-2.5">
                  <View className="items-center py-1">
                    <Feather name="wind" size={24} color="#4B5563" />
                    <Text className="text-sm text-gray-600 mt-2">
                      {`${Math.round(forecast?.current?.wind_kph ?? 60)}km/h`}
                    </Text>
                    <Text className="text-xs text-gray-500">Wind</Text>
                  </View>

                  <View className="items-center py-1">
                    <SimpleLineIcons name="drop" size={24} color="#4B5563" />
                    <Text className="text-sm text-gray-600 mt-2">
                      {forecast?.current?.humidity ?? 23}%
                    </Text>
                    <Text className="text-xs text-gray-500">Humidity</Text>
                  </View>

                  <View className="items-center py-1">
                    <Feather name="sunrise" size={24} color="#4B5563" />
                    <Text className="text-sm text-gray-600 mt-2">
                      {forecast?.forecast?.forecastday?.[0]?.astro?.sunrise ??
                        "3:45 PM"}
                    </Text>
                    <Text className="text-xs text-gray-500">Sunrise</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {/* Weekly Forecast */}
          <View className="w-full mt-6 bg-white rounded-3xl p-6 shadow-lg">
            <View className="flex-row items-center mb-4">
              <Feather name="calendar" size={20} color="#1f2937" />
              <Text className="text-xl font-bold text-gray-800 ml-2">
                Weekly Forecast
              </Text>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={
                Platform.OS === "web" ? true : false
              }
              contentContainerStyle={{
                gap: Platform.OS === "web" ? 48 : 2,
                justifyContent: "space-between",
              }}
            >
              {forecast?.forecast?.forecastday?.map(
                (
                  item: {
                    date: string;
                    day: {
                      avgtemp_c: number;
                      condition: {
                        text: string;
                      };
                    };
                  },
                  index: number
                ) => (
                  <View
                    key={index}
                    className={`bg-blue-50 rounded-2xl px-2 py-3.5 mr-4 w-32 shadow-sm over ${
                      Platform.OS === "web" ? "my-2" : "my-1.5"
                    }`}
                  >
                    <Text className="text-gray-600 text-center mb-2">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </Text>
                    <View className="items-center">
                      <Image
                        source={
                          weatherImages[
                            item.day.condition
                              .text as keyof typeof weatherImages
                          ] ?? weatherImages.other
                        }
                        className="!w-10 !h-10"
                      />
                      <Text className="text-gray-600 mt-2">
                        {Math.round(item.day.avgtemp_c)}&#176;
                      </Text>
                    </View>
                  </View>
                )
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
