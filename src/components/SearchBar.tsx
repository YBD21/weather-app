import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Control, Controller } from "react-hook-form";
import { SearchFormData } from "../schemas/searchSchema";
import { useEffect, useMemo } from "react";

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
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim()) {
          onSearch();
        }
      }, 500),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Controller
      control={control}
      name="searchQuery"
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          className={`flex-1 px-2 py-1.5 text-gray-700 font-medium text-base focus:outline-none ${
            error ? "border-red-500" : ""
          }`}
          placeholder="Search for a location..."
          placeholderTextColor="#9CA3AF"
          value={value}
          autoFocus={true}
          onChangeText={(text) => {
            onChange(text);
            debouncedSearch(text);
          }}
          onEndEditing={() => debouncedSearch.cancel()}
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
  // useEffect(() => {
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
  //     () => {
  //       console.log("Keyboard is dismissed");
  //       setShowSearchBar(false);
  //     }
  //   );

  //   return () => keyboardDidHideListener.remove();
  // }, []);

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

function debounce(func: (value: string) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  const debouncedFunction = (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(value), delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
}
