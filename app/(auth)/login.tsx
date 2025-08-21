import { Link } from "expo-router";
import { View, Text } from "react-native";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const { t } = useTranslation("common");
  return (
    <View className="flex-1 bg-background px-5 justify-center gap-6">
      <Text className="text-3xl font-semibold text-foreground">
        {t("auth.login.title")}
      </Text>
      <View className="gap-3">
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
      <Button title={t("auth.login.cta") as string} onPress={() => {}} />
      <View className="flex-row items-center justify-between">
        <Link href="/(auth)/forgot" className="text-primary">
          {t("auth.forgot.title")}
        </Link>
        <Link href="/(auth)/register" className="text-primary">
          {t("auth.register.title")}
        </Link>
      </View>
    </View>
  );
}
