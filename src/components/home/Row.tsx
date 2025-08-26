import { View, Text, FlatList, ListRenderItem } from "react-native";
import { PosterCard } from "./PosterCard";

type Item = { id: string; title: string; imageUrl: string };
type Props = {
  title: string;
  data: Item[];
  onPressItem?: (item: Item) => void;
};

export function Row({ title, data, onPressItem }: Props) {
  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <PosterCard
      title={item.title}
      imageUrl={item.imageUrl}
      onPress={() => onPressItem?.(item)}
    />
  );

  return (
    <View className="mb-5">
      <Text className="text-white text-base font-semibold px-2 mb-3">{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 8 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
