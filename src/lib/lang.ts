// src/lib/lang.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/i18n";

const KEY = "lang";

export async function setAppLanguage(lang: "pt" | "en" | "es") {
  await AsyncStorage.setItem(KEY, lang);
  await i18n.changeLanguage(lang);
}

export async function bootstrapLanguage() {
  const saved = await AsyncStorage.getItem(KEY);
  if (saved && ["pt", "en", "es"].includes(saved)) {
    await i18n.changeLanguage(saved as any);
  }
}
