import { View, Text, Pressable } from "react-native";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
const LANGS = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];
export default function Settings() {
  const { t } = useTranslation("common");
  const current = i18n.language;
  return (
    <View className="flex-1 bg-black px-5 py-4 gap-3">
      <Text className="text-2xl font-semibold text-white">
        {t("settings.title")}
      </Text>
      {LANGS.map((l) => (
        <Pressable
          key={l.code}
          onPress={() => i18n.changeLanguage(l.code)}
          className={`px-4 py-3 rounded-2xl ${
            current.startsWith(l.code) ? "bg-neutral-800" : "bg-neutral-900"
          }`}
        >
          <Text className="text-white">{l.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
