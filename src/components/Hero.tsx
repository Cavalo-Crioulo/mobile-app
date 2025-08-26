// src/components/Hero.tsx
import { ImageBackground, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "@/lib/cn";

type Img =
  | number // require(".../file.png")
  | { uri: string };

type HeroProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: Img; // opcional
  height?: number; // altura do bloco
  ctaLabel?: string;
  onPressCta?: () => void;
  secondaryLabel?: string;
  onPressSecondary?: () => void;
  className?: string; // classes extras (margens, etc.)
};

export function Hero({
  title,
  subtitle,
  backgroundImage,
  height = 280,
  ctaLabel,
  onPressCta,
  secondaryLabel,
  onPressSecondary,
  className,
}: HeroProps) {
  const content = (
    <>
      {/* Overlay com gradiente para leitura */}
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ ...StyleSheet.absoluteFillObject }}
      />

      <View className="flex-1 justify-end p-5">
        <Text
          className="text-white text-2xl font-extrabold"
          accessibilityRole="header"
        >
          {title}
        </Text>

        {subtitle ? (
          <Text className="text-text-secondary mt-2 text-base">{subtitle}</Text>
        ) : null}

        <View className="flex-row gap-3 mt-4">
          {ctaLabel ? (
            <TouchableOpacity
              onPress={onPressCta}
              accessibilityRole="button"
              className="bg-success px-4 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold">{ctaLabel}</Text>
            </TouchableOpacity>
          ) : null}

          {secondaryLabel ? (
            <TouchableOpacity
              onPress={onPressSecondary}
              accessibilityRole="button"
              className="bg-surface px-4 py-3 rounded-xl border border-white/15"
            >
              <Text className="text-white font-semibold">{secondaryLabel}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  );

  if (backgroundImage) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={{ height }}
        imageStyle={{ resizeMode: "cover" }}
        className={cn("w-full overflow-hidden rounded-2xl", className)}
      >
        {content}
      </ImageBackground>
    );
  }

  // fallback sem imagem: fundo dark com leve gradiente
  return (
    <View
      style={{ height }}
      className={cn(
        "w-full overflow-hidden rounded-2xl bg-background",
        className
      )}
    >
      {content}
    </View>
  );
}

import { StyleSheet } from "react-native";
