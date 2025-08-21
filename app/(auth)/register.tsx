import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

export default function RegisterScreen() {
  const { t } = useTranslation("common");
  return (
    <View className="flex-1 bg-background px-5 justify-center gap-6">
      <Text className="text-3xl font-semibold text-foreground">
        {t("auth.register.title")}
      </Text>
      <View className="gap-3">
        <Input
          label={t("auth.register.name") as string}
          placeholder="Seu nome"
        />
        <Input
          label={t("auth.login.email") as string}
          placeholder="email@exemplo.com"
          keyboardType="email-address"
        />
        <Input
          label={t("auth.login.password") as string}
          placeholder="••••••••"
          secureTextEntry
        />
      </View>
      <Button title={t("auth.register.cta") as string} onPress={() => {}} />
      <Link href="/(auth)/login" className="text-primary text-center">
        {t("auth.login.title")}
      </Link>
    </View>
  );
}
