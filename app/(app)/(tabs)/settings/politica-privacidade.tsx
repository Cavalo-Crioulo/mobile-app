import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function PoliticaPrivacidade() {
  const router = useRouter();
  const { t } = useTranslation("settings");

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 16 }}>
      <TouchableOpacity className="mb-4" onPress={() => router.back()}>
        <Text className="text-text-secondary">{"<"} {t("title")}</Text>
      </TouchableOpacity>

      <Text className="text-text-primary text-2xl font-extrabold mb-3">
        {t("privacy_policy.title")}
      </Text>

      <View className="bg-surface rounded-2xl p-4">
        <Text className="text-text-secondary">{t("privacy_policy.content")}</Text>
      </View>
    </ScrollView>
  );
}
