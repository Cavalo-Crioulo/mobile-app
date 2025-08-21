import type { ModuleType, Services } from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

const STORAGE_KEY = "ccapp:lang";

export const languageDetector = {
  type: "languageDetector" as ModuleType,
  async: true,
  init: () => {},
  detect: async (callback: (lng: string) => void) => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) return callback(stored);
      // exemplo: "pt-BR" => "pt"
      const sys = Localization.getLocales?.()[0]?.languageCode ?? "pt";
      callback(sys);
    } catch {
      callback("pt");
    }
  },
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lng);
    } catch {}
  },
} satisfies Partial<Services["languageDetector"]>;
