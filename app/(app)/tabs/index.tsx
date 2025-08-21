// app/(tabs)/index.tsx
import { View, Text, ScrollView } from "react-native";
import { Button } from "@/components/ui/Button";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Cavalo Crioulo App 🐎</Text>
      <Text className="text-base text-gray-600 mb-6">
        Bem-vindo! Aqui você verá os próximos eventos, notícias e destaques.
      </Text>

      <Button title="Ver Eventos" onPress={() => {}} />
      <Button title="Últimas Notícias" variant="secondary" onPress={() => {}} />
    </ScrollView>
  );
}
