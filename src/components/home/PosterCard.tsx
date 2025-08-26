import { View, Image, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  imageUrl: string;
  onPress?: () => void;
};

export function PosterCard({ title, imageUrl, onPress }: Props) {
  return (
    <TouchableOpacity className="w-28 mr-3" onPress={onPress} activeOpacity={0.85}>
      <View className="w-28 h-40 bg-surface rounded-xl overflow-hidden">
        <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
      </View>
      <Text numberOfLines={2} className="text-white text-xs mt-2">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
