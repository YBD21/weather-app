import React from "react";
import { View, Text, ScrollView, Image, Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { weatherImages } from "@/src/constants";

interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    condition: {
      text: string;
    };
  };
}

interface WeeklyForecastProps {
  forecast?: ForecastDay[];
}

export const WeeklyForecast = React.memo(
  ({ forecast }: WeeklyForecastProps) => {
    if (!forecast || forecast.length === 0) {
      return null;
    }

    return (
      <View className="w-full mt-6 bg-white rounded-3xl px-6 py-2.5 shadow-lg">
        <View className="flex-row items-center mb-4">
          <Feather name="calendar" size={20} color="#1f2937" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Weekly Forecast
          </Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={Platform.OS === "web"}
          contentContainerStyle={{
            gap: Platform.OS === "web" ? 48 : 2,
            justifyContent: "space-between",
          }}
        >
          {forecast.map((item, index) => (
            <DayForecast key={index} item={item} />
          ))}
        </ScrollView>
      </View>
    );
  }
);

// Sub-component for each day's forecast
interface DayForecastProps {
  item: ForecastDay;
}

const DayForecast = React.memo(({ item }: DayForecastProps) => (
  <View
    className={`bg-blue-50 rounded-2xl px-2 py-3.5 mr-4 w-28 shadow-sm ${
      Platform.OS === "web" ? "my-2" : "my-1.5"
    }`}
  >
    <Text className="text-gray-600 text-center mb-2">
      {new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
      })}
    </Text>
    <View className="items-center">
      <Image
        source={
          weatherImages[
            item.day.condition.text as keyof typeof weatherImages
          ] ?? weatherImages.other
        }
        className="!w-10 !h-10"
      />
      <Text className="text-gray-600 mt-2">
        {Math.round(item.day.avgtemp_c)}&#176;
      </Text>
    </View>
  </View>
));
