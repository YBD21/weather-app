import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
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

  return (
    <View className="flex-1 bg-blue-100 p-6">
      <View className="space-y-6">
        <View className="bg-white rounded-lg shadow-md p-4">
          <View className="flex-row items-center border border-blue-300 rounded-md px-2">
            <FontAwesome name="search" size={20} color="#94A3B8" />
            <TextInput
              className="flex-1 px-4 py-2 text-blue-900"
              placeholder="Search location..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg active:bg-blue-700 shadow-md flex-row justify-center items-center space-x-2"
          onPress={handleSearch}
        >
          <FontAwesome name="search" size={20} color="white" />
          <Text className="text-white font-semibold text-center ml-2">
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg flex-row justify-center items-center space-x-2 active:bg-blue-600 shadow-md"
          onPress={getLocation}
        >
          <MaterialIcons name="my-location" size={20} color="white" />
          <Text className="text-white font-semibold text-center ml-2">
            Get Current Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
