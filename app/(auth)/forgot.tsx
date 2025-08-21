import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

export default function ForgotScreen() {
  const { t } = useTranslation("common");
  return (
    <View className="flex-1 bg-background px-5 justify-center gap-6">
      <Text className="text-3xl font-semibold text-foreground">
        {t("auth.forgot.title")}
      </Text>
      <Input
        label={t("auth.login.email") as string}
        placeholder="email@exemplo.com"
        keyboardType="email-address"
      />
      <Button title={t("auth.forgot.cta") as string} onPress={() => {}} />
      <Link href="/(auth)/login" className="text-primary text-center">
        {t("auth.login.title")}
      </Link>
    </View>
  );
}
