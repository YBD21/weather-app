import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Control, Controller } from "react-hook-form";
import { SearchFormData } from "../schemas/searchSchema";
import { useEffect } from "react";
import { useSearchBarStore } from "../store/useStore";

interface SearchBarProps {
  control: Control<SearchFormData>;
  onSearch: () => void;
  onLocationPress: () => void;
  hasLocation: boolean;
}

const LocationButton = ({
  onLocationPress,
  hasLocation,
}: Pick<SearchBarProps, "onLocationPress" | "hasLocation">) => (
  <TouchableOpacity onPress={onLocationPress}>
    <MaterialIcons
      name={hasLocation ? "my-location" : "location-searching"}
      size={20}
      className="mr-2 !text-blue-500"
    />
  </TouchableOpacity>
);

const SearchInput = ({
  control,
  onSearch,
}: Pick<SearchBarProps, "control" | "onSearch">) => {
  return (
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
          autoFocus={true}
          onChangeText={onChange}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
      )}
    />
  );
};

const SearchButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-blue-500 px-3 py-2.5 rounded-full active:bg-blue-600"
  >
    <FontAwesome name="search" size={18} color="white" />
  </TouchableOpacity>
);

export const SearchBar = ({
  control,
  onSearch,
  onLocationPress,
  hasLocation,
}: SearchBarProps) => {
  const { setShowSearchBar } = useSearchBarStore();

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        console.log("Keyboard is dismissed");
        setShowSearchBar(false);
      }
    );

    return () => keyboardDidHideListener.remove();
  }, []);

  return (
    <View className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <View className="flex-row items-center px-3 py-1">
        <LocationButton
          onLocationPress={onLocationPress}
          hasLocation={hasLocation}
        />
        <SearchInput control={control} onSearch={onSearch} />
        <SearchButton onPress={onSearch} />
      </View>
    </View>
  );
};
