import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SearchBarState {
  showSearchBar: boolean;
  setShowSearchBar: (status: boolean) => void;
}

export interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface LocationSuggestionState {
  suggestions: Location[];
  setSuggestions: (locations: Location[]) => void;
}

interface WeatherState {
  forecast: any | null; // Replace 'any' with your specific forecast type
  setForecast: (forecast: any) => void; // Replace 'any' with your specific forecast type
}

export const useSearchBarStore = create<SearchBarState>()((set) => ({
  showSearchBar: false,
  setShowSearchBar: (status) => set({ showSearchBar: status }),
}));

export const useLocationSuggestion = create<LocationSuggestionState>()(
  (set) => ({
    suggestions: [],
    setSuggestions: (locations) => set({ suggestions: locations }),
  })
);

// useWeatherStore with proper persist implementation
export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      forecast: null,
      setForecast: (forecast) => set({ forecast }),
    }),
    {
      name: "weather-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
