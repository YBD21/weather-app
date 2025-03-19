import { Link, Stack } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-blue-50 px-6">
        <Text className="text-8xl mb-4">🌧️</Text>
        <Text className="text-9xl font-bold text-blue-600">404</Text>
        <Text className="mb-2 text-2xl font-bold text-gray-600">
          Forecast Not Found !
        </Text>
        <Text className="mb-8 text-center text-gray-600">
          Looks like you've wandered into cloudy territory! This weather station
          doesn't exist.
        </Text>
        <Link href="/" asChild>
          <Pressable className="rounded-lg bg-blue-400 px-6 py-3 active:bg-blue-600">
            <Text className="text-center font-semibold text-white">
              Back to Clear Skies
            </Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
