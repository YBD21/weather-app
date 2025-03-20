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
          <View className="bg-white rounded-2xl shadow-lg mt-6 overflow-hidden border border-gray-200">
            <View className="flex-row items-center px-3 py-1">
              <TouchableOpacity onPress={getLocation}>
                <MaterialIcons
                  name={`${location ? "my-location" : "location-searching"}`}
                  size={20}
                  className="mr-2 !text-blue-500"
                />
              </TouchableOpacity>
              <TextInput
                className="flex-1 py-3 px-2 text-gray-700 font-medium text-base"
                placeholder="Search for a location..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCapitalize="words"
              />
              <TouchableOpacity
                onPress={handleSearch}
                className="bg-blue-500 p-2.5 rounded-full active:bg-blue-600"
              >
                <FontAwesome name="search" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* suggest search value */}
          <View className="bg-white rounded-xl shadow-md px-4 py-2.5 my-1.5">
            {dummyLocations.map((city, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSearchQuery(city);
                  handleSearch();
                }}
                className="flex-row items-center py-3 border-b border-gray-100 active:bg-blue-50"
                style={{
                  borderBottomWidth:
                    index === dummyLocations.length - 1 ? 0 : 1,
                }}
              >
                <View className="bg-blue-100 p-2 rounded-full">
                  <MaterialIcons
                    name="location-on"
                    size={18}
                    className="!text-blue-500"
                  />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-gray-500 font-semibold">{city}</Text>
                  <Text className="text-xs text-gray-500">Tap to select</Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  className="!text-gray-400"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
