import { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";
import { cn } from "@/lib/cn"; // se não tiver helper cn, pode remover e usar string direta

type Props = ViewProps & {
  rounded?: string; // ex: "rounded-xl"
  className?: string;
};

export function Skeleton({
  style,
  className = "",
  rounded = "rounded-md",
  ...rest
}: Props) {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[style, { opacity }]}
      // bg-white/10 em superfícies escuras fica elegante
      className={cn(`bg-white/10 ${rounded}`, className)}
      {...rest}
    />
  );
}
