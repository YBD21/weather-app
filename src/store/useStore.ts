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
