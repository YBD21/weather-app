import React, { useState } from "react";
import { Stack } from "expo-router";
import {
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
  Text,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "@/src/components/SearchBar";
import { LocationSuggestions } from "@/src/components/LocationSuggestions";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [showSearchBar, setShowSearchBar] = useState(false);

  const dummyLocations = ["London, United Kingdom", "New York, USA"];

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
          headerStyle: { backgroundColor: "#3B82F6" },
          headerTintColor: "white",
        }}
      />
      <View className="flex-1 bg-blue-100 px-4 py-2.5">
        <View className="space-y-6 mx-4">
          <View
            className={`w-full transition-all duration-500 ease-in-out  ${
              showSearchBar
                ? "translate-y-0 translate-x-0"
                : "-translate-y-2 translate-x-5"
            }`}
          >
            {showSearchBar ? (
              <>
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
              </>
            ) : (
              <View className="flex-row items-center justify-end mx-3 my-2 relative">
                <TouchableOpacity
                  onPress={() => setShowSearchBar(true)}
                  className="bg-blue-500 px-3 py-2.5 rounded-full active:bg-blue-600 transition-all duration-300"
                >
                  <FontAwesome name="search" size={18} color="white" />
                </TouchableOpacity>
              </View>
            )}
            {/* forcast section */}
            <View className=" mx-4 flex justify-around mb-2">
              {/* weather location and name */}
              <View className="flex items-center justify-center mt-8">
                <Text className="text-3xl font-semibold text-gray-800">
                  London
                </Text>
                <Text className="text-xl text-gray-600">United Kingdom</Text>
              </View>
              {/* weather image */}
              <View className="flex-row items-center justify-center">
                <Image
                  source={require("../../../assets/cloud-images/partly-cloudy.png")}
                  className="w-52 h-52"
                />
              </View>
              {/* degree celcius*/}

              <View className="flex items-center justify-center space-y-2">
                <Text className="text-5xl font-semibold text-gray-800">
                  20°C
                </Text>
              </View>
              {/* other stats */}
              <View className="flex-row justify-between space-y-2 mx-4">
                <View className="flex-row space-x-2 items-center">
                  <Text className="text-gray-800">Wind Speed</Text>
                  <Text className="text-gray-600">60 Km/hr</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
