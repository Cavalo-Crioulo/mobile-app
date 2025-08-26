// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { BottomBar } from "@/components/BottomBar";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Início" }} />
      <Tabs.Screen name="eventos" options={{ title: "Agenda" }} />
      <Tabs.Screen name="settings" options={{ title: "Configurações" }} />
    </Tabs>
  );
}
