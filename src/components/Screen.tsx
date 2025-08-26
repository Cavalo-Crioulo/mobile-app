// src/components/Screen.tsx
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ViewStyle } from "react-native";

type ScreenProps = {
  children: ReactNode;
  style?: ViewStyle;
  barStyle?: "light" | "dark" | "auto";
};

export function Screen({ children, style, barStyle = "auto" }: ScreenProps) {
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: "#101010" }, style]}
      edges={["top", "left", "right"]}
    >
      <StatusBar style={barStyle} />
      {children}
    </SafeAreaView>
  );
}
