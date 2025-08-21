import {
  View,
  Text,
  Image,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  image?: ImageSourcePropType;
  style?: ViewStyle;
};

export function Card({ title, subtitle, image, style }: Props) {
  return (
    <View
      className="w-64 h-36 bg-card rounded-2xl p-4 justify-between"
      style={style}
    >
      {image ? (
        <Image
          source={image}
          className="absolute inset-0 rounded-2xl"
          style={{ opacity: 0.2 }}
        />
      ) : null}
      <Text className="text-foreground font-semibold" numberOfLines={2}>
        {title}
      </Text>
      {!!subtitle && (
        <Text className="text-muted" numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
