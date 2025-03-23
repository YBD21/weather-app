import { Pressable, Text, View } from "react-native";
import { Link, Stack } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Component for the weather header section
const Header = () => (
  //  later add weather icon and temperature here
  <View className="flex items-center justify-center">
    <View className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
      <MaterialIcons name="sunny" className="!text-5xl !text-yellow-400" />
    </View>
  </View>
);

// Component for welcome text
const WelcomeText = () => (
  <View className="my-8 px-4">
    <Text className="text-4xl font-bold tracking-tight text-gray-900 text-center">
      Weather Forecast
    </Text>
    <Text className="mt-2 text-lg text-gray-600 text-center">
      Your daily weather companion
    </Text>
  </View>
);

// Component for quick weather status
const WeatherStatus = () => (
  <Link href="/home" asChild>
    <Pressable>
      <View className="px-6 py-4 mx-4 bg-white rounded-xl shadow-sm">
        <Text className="text-xl text-center text-gray-800">
          Tap to check the weather in your area
        </Text>
      </View>
    </Pressable>
  </Link>
);

// Main component
export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex flex-1 justify-center bg-blue-50">
        <Header />
        <WelcomeText />
        <WeatherStatus />
      </View>
    </>
  );
}
