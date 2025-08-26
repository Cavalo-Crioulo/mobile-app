import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  Home as HomeIcon,
  Calendar as CalendarIcon,
  Settings as SettingsIcon,
} from "lucide-react-native";
import { colors } from "@/lib/theme"; // usa a paleta mapeada no tailwind.config

const ICONS: Record<string, any> = {
  home: HomeIcon,
  eventos: CalendarIcon,
  settings: SettingsIcon,
};

export function BottomBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <SafeAreaView edges={["bottom"]} className="bg-transparent">
      <View
        className="
          w-full flex-row items-center justify-between
          bg-surface border-t border-white/10
          py-2 pb-5
          shadow-lg
        "
        // (sombras ainda precisam de style manual para ficar iguais no iOS/Android)
        style={{
          elevation: 12,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -2 },
        }}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel ?? options.title ?? route.name;

          const Icon = ICONS[route.name] ?? HomeIcon;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              activeOpacity={0.85}
              className="flex-1 items-center justify-center py-0.5"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {/* Ícone (não aceita className) */}
              <Icon
                size={22}
                strokeWidth={2.2}
                color={focused ? colors.textPrimary : colors.textSecondary}
              />

              {/* Rótulo */}
              <Text
                className={
                  focused
                    ? "text-white text-[12px] font-semibold mt-1"
                    : "text-text-secondary text-[12px] mt-1"
                }
                numberOfLines={1}
              >
                {String(label)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
