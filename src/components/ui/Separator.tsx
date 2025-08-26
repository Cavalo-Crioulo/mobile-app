import { View, Text } from "react-native";
import { cn } from "@/lib/cn";

interface SeparatorProps {
  className?: string;
  label?: string;
}

export function Separator({ className, label }: SeparatorProps) {
  return (
    <View className={cn("flex-row items-center my-4", className)}>
      {/* Linha esquerda */}
      <View className="flex-1 h-[1px] bg-text-secondary/30" />

      {/* Texto central (opcional) */}
      {label ? (
        <Text className="mx-3 text-text-secondary text-sm font-medium">
          {label}
        </Text>
      ) : null}

      {/* Linha direita */}
      <View className="flex-1 h-[1px] bg-text-secondary/30" />
    </View>
  );
}
