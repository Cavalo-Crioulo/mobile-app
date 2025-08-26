import { ImageBackground, View, Text, TouchableOpacity } from "react-native";
import { Play } from "lucide-react-native";

type Props = {
  title: string;
  subtitle?: string;
  imageUrl: string;
  onPressPlay?: () => void;
  onPressDetails?: () => void;
};

export function HeroBanner({
  title,
  subtitle,
  imageUrl,
  onPressPlay,
  onPressDetails,
}: Props) {
  return (
    <View className="h-[380px] w-full rounded-2xl overflow-hidden bg-surface mb-4 mt-4">
      <ImageBackground
        source={{ uri: imageUrl }}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex-1 bg-black/30 p-4 justify-end">
          <Text className="text-white text-xl font-extrabold">{title}</Text>
          {!!subtitle && <Text className="text-white/80 mt-1">{subtitle}</Text>}

          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity
              onPress={onPressPlay}
              className="bg-white rounded-xl px-4 py-2 flex-row items-center"
              activeOpacity={0.9}
            >
              <Play size={18} color="#111827" />
              <Text className="text-[#111827] font-semibold ml-2">
                Assistir
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressDetails}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-2"
              activeOpacity={0.9}
            >
              <Text className="text-white font-semibold">Detalhes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
