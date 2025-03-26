import React from "react";
import { View, Text, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { weatherImages } from "@/src/constants";

interface WeatherCardProps {
  forecast: any; // Consider creating a proper type for forecast
}

export const WeatherCard = React.memo(({ forecast }: WeatherCardProps) => {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-lg">
      {/* Location Info */}
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold text-gray-800">
          {forecast?.location?.name ?? "London"}
        </Text>
        <Text className="py-1.5 text-lg text-gray-600">
          {forecast?.location?.country ?? "United Kingdom"}
        </Text>
      </View>

      {/* Weather Image */}
      <View className="items-center mb-6">
        <Image
          source={
            weatherImages[
              forecast?.current?.condition?.text as keyof typeof weatherImages
            ] ?? weatherImages.other
          }
          className="!w-36 !h-36"
        />
      </View>

      {/* Temperature */}
      <View className="items-center mb-8">
        <Text className="text-6xl font-bold text-gray-800">
          {`${Math.round(forecast?.current?.temp_c ?? 20)}°`}
        </Text>
        <Text className="text-xl text-gray-600 mt-2">
          {forecast?.current?.condition?.text ?? "Partly Cloudy"}
        </Text>
      </View>

      {/* Weather Stats */}
      <View className="flex-row justify-between px-6 py-4 bg-blue-50 rounded-2xl mx-2.5">
        <WeatherStat
          icon={<Feather name="wind" size={24} color="#4B5563" />}
          value={`${Math.round(forecast?.current?.wind_kph ?? 60)}km/h`}
          label="Wind"
        />

        <WeatherStat
          icon={<SimpleLineIcons name="drop" size={24} color="#4B5563" />}
          value={`${forecast?.current?.humidity ?? 23}%`}
          label="Humidity"
        />

        <WeatherStat
          icon={<Feather name="sunrise" size={24} color="#4B5563" />}
          value={
            forecast?.forecast?.forecastday?.[0]?.astro?.sunrise ?? "3:45 PM"
          }
          label="Sunrise"
        />
      </View>
    </View>
  );
});

// Sub-component for weather statistics
interface WeatherStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const WeatherStat = React.memo(({ icon, value, label }: WeatherStatProps) => (
  <View className="items-center py-1">
    {icon}
    <Text className="text-sm text-gray-600 mt-2">{value}</Text>
    <Text className="text-xs text-gray-500">{label}</Text>
  </View>
));
