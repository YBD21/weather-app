import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SearchBarState {
  showSearchBar: boolean;
  setShowSearchBar: (status: boolean) => void;
}

export const useSearchBarStore = create<SearchBarState>()((set) => ({
  showSearchBar: false,
  setShowSearchBar: (status) => set({ showSearchBar: status }),
}));
