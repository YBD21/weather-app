import React, { useState } from "react";
import { Stack } from "expo-router";
import { View, TouchableOpacity, Alert, Keyboard } from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "@/src/components/SearchBar";
import { LocationSuggestions } from "@/src/components/LocationSuggestions";
import { animated, useSpring } from "react-spring";

const AnimatedView = animated(View);

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

  // Animate opacity and slide on toggle using react-spring.
  const searchBarAnimation = useSpring({
    translateY: showSearchBar ? 0 : -1,
    translateX: showSearchBar ? 0 : 20,
    config: { tension: 100, friction: 10 },
  });

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
          <AnimatedView
            style={{
              transform: [
                { translateX: searchBarAnimation.translateX.to((x) => x) },
                { translateY: searchBarAnimation.translateY.to((y) => y) },
              ],
            }}
            className="w-full"
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
          </AnimatedView>
        </View>
      </View>
    </>
  );
};

export default Home;
