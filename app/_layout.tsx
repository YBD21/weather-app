import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: true, headerTitleAlign: "center" }}>
        <Stack.Screen name="+not-found" options={{ headerShown: true }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
