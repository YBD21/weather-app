import React, { useState } from "react";
import { Stack } from "expo-router";
import {
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { SearchBar } from "@/src/components/SearchBar";
import { LocationSuggestions } from "@/src/components/LocationSuggestions";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [showSearchBar, setShowSearchBar] = useState(false);

  const dummyLocations = ["London, United Kingdom", "New York, USA"];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleSearch = () => {
    Keyboard.dismiss();
    console.log("Search query:", searchQuery);
    setShowSearchBar(false);
  };

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
      console.log("Current location:", currentLocation);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get location");
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setSearchQuery(selectedLocation);
    handleSearch();
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
      <SafeAreaView className="flex-1 bg-blue-100">
        <ScrollView className="flex-1">
          <View className="px-4 py-5">
            {/* Search Section */}
            {/* later add animation libary for this */}
            <View
              className={`mb-4 transition-all duration-500 ease-in-out !z-50  ${
                showSearchBar
                  ? "translate-y-0 translate-x-0"
                  : "-translate-y-2 translate-x-1"
              }`}
            >
              {showSearchBar ? (
                <View className="relative w-full flex">
                  <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSearch={handleSearch}
                    onLocationPress={getLocation}
                    hasLocation={!!location}
                  />
                  <LocationSuggestions
                    locations={dummyLocations}
                    onSelectLocation={handleLocationSelect}
                  />
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
                <Text className="text-3xl font-bold text-gray-800">London</Text>
                <Text className="text-lg text-gray-600">United Kingdom</Text>
              </View>

              {/* Weather Image */}
              <View className="items-center mb-6">
                <Image
                  source={require("../../../assets/cloud-images/partly-cloudy.png")}
                  className="!w-36 !h-36"
                />
              </View>

              {/* Temperature */}
              <View className="items-center mb-8">
                <Text className="text-6xl font-bold text-gray-800">20°</Text>
                <Text className="text-xl text-gray-600 mt-2">
                  Partly Cloudy
                </Text>
              </View>

              {/* Weather Stats */}
              <View className="flex-row justify-between px-4 py-4 bg-gray-50 rounded-2xl">
                <View className="items-center">
                  <Feather name="wind" size={24} color="#4B5563" />
                  <Text className="text-sm text-gray-600 mt-2">60 km/h</Text>
                  <Text className="text-xs text-gray-500">Wind</Text>
                </View>

                <View className="items-center">
                  <SimpleLineIcons name="drop" size={24} color="#4B5563" />
                  <Text className="text-sm text-gray-600 mt-2">23%</Text>
                  <Text className="text-xs text-gray-500">Humidity</Text>
                </View>

                <View className="items-center">
                  <Feather name="sunrise" size={24} color="#4B5563" />
                  <Text className="text-sm text-gray-600 mt-2">3:45 PM</Text>
                  <Text className="text-xs text-gray-500">Sunrise</Text>
                </View>
              </View>
            </View>

            {/* Weekly Forecast */}
            <View className="mt-6 bg-white rounded-3xl p-6 shadow-lg">
              <Text className="text-xl font-bold text-gray-800 mb-4">
                Weekly Forecast
              </Text>
              {days.map((day) => (
                <View
                  key={day}
                  className="flex-row justify-between items-center py-3 border-b border-gray-100"
                >
                  <Text className="text-gray-600">{day}</Text>
                  <View className="flex-row items-center">
                    <Feather name="cloud" size={20} color="#4B5563" />
                    <Text className="text-gray-600 ml-2">23° / 18°</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
