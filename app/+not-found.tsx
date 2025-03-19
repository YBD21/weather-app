import { Link, Stack } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-white dark:bg-black px-6">
        <Text className="text-9xl font-bold text-gray-800 dark:text-gray-200">
          404
        </Text>
        <Text className="mb-2 text-2xl font-bold text-black dark:text-white">
          Page Not Found
        </Text>
        <Text className="mb-8 text-center text-gray-900 dark:text-gray-100">
          Oops! The page you're looking for doesn't seem to exist.
        </Text>
        <Link href="/" asChild>
          <Pressable className="rounded-lg bg-black dark:bg-white px-6 py-3 active:bg-gray-800 dark:active:bg-gray-200">
            <Text className="text-center font-semibold text-white dark:text-black">
              Return to Home
            </Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
