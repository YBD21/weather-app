import { Text, View } from "react-native";
import { Stack } from "expo-router";

// Component for the logo/header section
const Header = () => (
  <>
    <View className="flex items-center justify-center">
      <View className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
        <Text className="text-white text-4xl font-bold">🚀</Text>
      </View>
    </View>
  </>
);

// Component for welcome text
const WelcomeText = () => (
  <View className="my-16 px-4">
    <Text className="text-4xl font-bold tracking-tight text-gray-900 text-center">
      Welcome
    </Text>
  </View>
);

// Main component
export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex flex-1 justify-center bg-gray-100">
        <Header />
        <WelcomeText />
      </View>
    </>
  );
}
