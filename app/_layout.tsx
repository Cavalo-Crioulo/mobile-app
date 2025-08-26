// app/_layout.tsx
import "@/i18n";
import { Slot, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { colors } from "@/lib/theme";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const nav = useRootNavigationState();
  if (!nav?.key) return null;

  return (
    <AuthProvider>
      <ThemeProvider
        value={{
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: colors.background, // 👈 fundo das telas
            card: colors.surface, // 👈 fundo do header/card
            border: "rgba(255,255,255,0.06)",
            text: colors.textPrimary,
            primary: colors.accent,
          },
        }}
      >
        {/* Safe area sem bottom para não empurrar a tab bar */}
        <SafeAreaView
          edges={["top", "left", "right"]}
          className="flex-1 bg-background"
        >
          <StatusBar style="light" />
          <Slot />
          <Toast />
        </SafeAreaView>
      </ThemeProvider>
    </AuthProvider>
  );
}
