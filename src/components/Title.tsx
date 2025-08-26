import { Text, View } from "react-native";
import { cn } from "@/lib/cn";

interface TitleProps {
  children: string;
  className?: string;
  subtitle?: string;
}

export function Title({ children, className, subtitle }: TitleProps) {
  return (
    <View className={cn("mb-4", className)}>
      <Text
        className="text-2xl font-extrabold text-text-primary"
        accessibilityRole="header"
      >
        {children}
      </Text>
      {subtitle ? (
        <Text className="text-text-secondary mt-1">{subtitle}</Text>
      ) : null}
    </View>
  );
}
