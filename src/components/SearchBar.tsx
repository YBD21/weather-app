import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onSearch: () => void;
  onLocationPress: () => void;
  hasLocation: boolean;
}

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  onSearch,
  onLocationPress,
  hasLocation,
}: SearchBarProps) => (
  <View className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
    <View className="flex-row items-center px-3 py-1">
      <TouchableOpacity onPress={onLocationPress}>
        <MaterialIcons
          name={hasLocation ? "my-location" : "location-searching"}
          size={20}
          className="mr-2 !text-blue-500"
        />
      </TouchableOpacity>
      <TextInput
        className="flex-1 py-3 px-2 text-gray-700 font-medium text-base"
        placeholder="Search for a location..."
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={onSearchChange}
        onSubmitEditing={onSearch}
        returnKeyType="search"
        autoCapitalize="words"
      />
      <TouchableOpacity
        onPress={onSearch}
        className="bg-blue-500 px-3 py-2.5 rounded-full active:bg-blue-600"
      >
        <FontAwesome name="search" size={18} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);
