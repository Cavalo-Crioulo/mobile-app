import { Stack } from "expo-router";
import { colors } from "@/lib/theme";

export default function SettingsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        // 👇 evita “flash branco” no cartão durante a animação
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
