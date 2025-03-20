import React, { useState } from "react";
import { Stack } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const dummyLocations = ["London, United Kingdom", "New York, USA"];

  const handleSearch = () => {
    Keyboard.dismiss();
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
    <>
      <Stack.Screen
        options={{
          title: "Rates",
          headerStyle: { backgroundColor: "#3B82F6" },
          headerTintColor: "white",
        }}
      />
      <View className="flex-1 bg-blue-100 px-4 py-2.5">
        <View className="space-y-6 mx-4">
          <View className="bg-white rounded-xl shadow-md mt-4">
            <View className="flex-row items-center border border-blue-50 rounded-xl px-2">
              <TextInput
                className="flex-1 px-4 py-2 !text-blue-500 font-semibold"
                placeholder="Search location..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCapitalize="words"
              />

              <TouchableOpacity
                onPress={handleSearch}
                className="bg-slate-100 py-2 px-3 -mr-2 rounded-lg active:bg-slate-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <FontAwesome
                  name="search"
                  size={20}
                  className="!text-blue-400"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* suggest search value */}
          <View className="bg-white rounded-xl shadow-md  px-4 py-2.5 my-1.5">
            {/* Display suggested location list */}
            {/* You can map through your locations data */}
            {dummyLocations.map((city, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSearchQuery(city);
                  handleSearch();
                }}
                className="flex-row items-center space-x-2 py-2 border-b border-gray-200"
              >
                <MaterialIcons
                  name="location-on"
                  size={20}
                  className="!text-blue-500"
                />
                <Text className="ml-1.5 !text-blue-400 font-semibold">
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className="bg-blue-500 mx-24 px-1.5 py-3.5 rounded-lg flex-row justify-center items-center space-x-2 active:bg-blue-600 shadow-md"
            onPress={getLocation}
          >
            <MaterialIcons name="my-location" size={20} color="white" />
            <Text className="text-white font-semibold text-center ml-2">
              Get Current Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Home;
