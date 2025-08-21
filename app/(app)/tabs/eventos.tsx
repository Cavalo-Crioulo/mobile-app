import { View, Text, FlatList } from "react-native";
import { getEventCalendar } from "@/mocks/fixtures";
import { Card } from "@/components/ui/Card";
import { useTranslation } from "react-i18next";

export default function EventosScreen() {
  const { t } = useTranslation("common");
  const events = getEventCalendar();
  return (
    <View className="flex-1 bg-background px-5 py-4">
      <Text className="text-2xl font-semibold text-foreground mb-4">
        {t("events.title")}
      </Text>
      <FlatList
        data={events}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subtitle={`${item.date} • ${item.city}/${item.uf}`}
          />
        )}
      />
    </View>
  );
}
