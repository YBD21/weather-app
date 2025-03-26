import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Location } from "../store/useStore";

interface LocationSuggestionsProps {
  locations: Location[];
  onSelectLocation: (cityName: string) => void;
}

export const LocationSuggestions = ({
  locations,
  onSelectLocation,
}: LocationSuggestionsProps) => (
  <View className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-md px-4 py-2.5 my-2.5">
    {locations.map((location) => (
      <TouchableOpacity
        key={location.id}
        onPress={() => onSelectLocation(location.name)}
        className="flex-row items-center py-3 border-b border-gray-100 active:bg-blue-50"
        style={{
          borderBottomWidth: location.id === locations.length - 1 ? 0 : 1,
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
          <Text className="text-gray-500 font-semibold">{`${location.name},${location.country}`}</Text>
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
);
