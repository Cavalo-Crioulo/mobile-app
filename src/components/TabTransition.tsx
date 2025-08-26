import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

type Props = {
  children: React.ReactNode;
  variant?: "fade" | "slide";
  duration?: number;
  className?: string; // 👈 permitir Tailwind aqui
};

export function TabTransition({ children, variant = "fade", duration = 220, className = "flex-1 bg-background" }: Props) {
  const p = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      p.value = 0;
      p.value = withTiming(1, { duration });
    }, [])
  );

  const style = useAnimatedStyle(() => {
    if (variant === "slide") {
      return {
        opacity: p.value,
        transform: [{ translateX: (1 - p.value) * 20 }],
      };
    }
    return { opacity: p.value };
  });

  return (
    <Animated.View style={style} className={className}>
      {children}
    </Animated.View>
  );
}
