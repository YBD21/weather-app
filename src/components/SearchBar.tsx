import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Control, Controller } from "react-hook-form";
import { SearchFormData } from "../schemas/searchSchema";

interface SearchBarProps {
  control: Control<SearchFormData>;
  onSearch: () => void;
  onLocationPress: () => void;
  hasLocation: boolean;
}

export const SearchBar = ({
  control,
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
      <Controller
        control={control}
        name="searchQuery"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput
            className={`flex-1 py-3 px-2 text-gray-700 font-medium text-base ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Search for a location..."
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChange}
            onSubmitEditing={onSearch}
            returnKeyType="search"
          />
        )}
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
