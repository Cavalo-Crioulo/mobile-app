// app/(tabs)/eventos.tsx  (ou app/(app)/(tabs)/eventos.tsx)
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getEventCalendar } from "@/mocks/fixtures";
import { Card } from "@/components/ui/Card";

type UIEvent = {
  id: string;
  title: string;
  date: string;
  city: string;
  uf: string;
};

export default function EventosScreen() {
  const [events, setEvents] = useState<UIEvent[]>([]);

  useEffect(() => {
    (async () => setEvents(await getEventCalendar()))();
  }, []);

  return (
    <View className="flex-1 bg-background px-5 py-4">
      <Text className="text-2xl font-semibold text-foreground mb-4">
        Agenda
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
