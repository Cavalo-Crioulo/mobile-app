import { Tabs } from "expo-router";
import { Home, CalendarDays, Settings } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { height: 60 } }}>
      <Tabs.Screen
        name="index" // Home
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Home size={22} color={focused ? "#0ea5e9" : "#9CA3AF"} />
          ),
        }}
      />
      <Tabs.Screen
        name="eventos"
        options={{
          title: "Eventos",
          tabBarIcon: ({ focused }) => (
            <CalendarDays size={22} color={focused ? "#0ea5e9" : "#9CA3AF"} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Config",
          tabBarIcon: ({ focused }) => (
            <Settings size={22} color={focused ? "#0ea5e9" : "#9CA3AF"} />
          ),
        }}
      />
    </Tabs>
  );
}
