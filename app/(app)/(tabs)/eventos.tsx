import { useMemo, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  RefreshControl,
  Image,
  ScrollView,
} from "react-native";
import { CalendarDays, MapPin, Bell, BellRing } from "lucide-react-native";
import Toast from "react-native-toast-message";
import Animated, { FadeInUp } from "react-native-reanimated";
import { TabTransition } from "@/components/TabTransition";

// skeletons
import {
  SkeletonEventCard,
  SkeletonSectionHeader,
} from "@/components/eventos/Skeletons";
import { TopBar } from "@/components/TopBar";

// —— tipos/categorias
type Category =
  | "Freio de Ouro"
  | "Morfologia"
  | "Leilão"
  | "Laço"
  | "Treinamento"
  | "Exposição";

type EventItem = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location: string;
  imageUrl: string;
  category: Category;
};

type EventSection = {
  title: string;
  dateKey: string;
  data: EventItem[];
};

const CATEGORIES: Category[] = [
  "Freio de Ouro",
  "Morfologia",
  "Leilão",
  "Laço",
  "Treinamento",
  "Exposição",
];

const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const meses = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];
const pad = (n: number) => n.toString().padStart(2, "0");
const fmtTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const fmtHeaderDate = (d: Date) =>
  `${dias[d.getDay()]} • ${pad(d.getDate())} ${meses[d.getMonth()]}`;
const ymd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addMinutes = (d: Date, m: number) => new Date(d.getTime() + m * 60000);

function buildFakeSections(): EventSection[] {
  const today = new Date(),
    map: Record<string, EventSection> = {};
  for (let day = 0; day < 10; day++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + day
    );
    const eventsCount = day % 2 === 0 ? 4 : 5;
    for (let i = 0; i < eventsCount; i++) {
      const start = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        8 + i * 2,
        (i % 2) * 30
      );
      const end = addMinutes(start, 60 + (i % 3) * 15);
      const id = `${ymd(date)}-${i}`;
      const category = CATEGORIES[(day + i) % CATEGORIES.length];
      const titleByCategory: Record<Category, string[]> = {
        "Freio de Ouro": [
          "Freio de Ouro – Classificatória",
          "Freio de Ouro – Eliminatórias",
          "Freio de Ouro – Final",
        ],
        Morfologia: [
          "Exposição Morfológica",
          "Mostra Morfológica",
          "Avaliação Morfológica",
        ],
        Leilão: ["Leilão Crioulo", "Leilão de Potros", "Leilão Especial"],
        Laço: ["Prova de Laço", "Laço em Dupla", "Laço Cronometrado"],
        Treinamento: [
          "Treinamento de pista",
          "Clínica de Adestramento",
          "Mounted Skills",
        ],
        Exposição: [
          "Apresentação de Raça",
          "Mostra de Campeões",
          "Exposição Nacional",
        ],
      };
      const title = `${titleByCategory[category][(i + day) % 3]} #${i + 1}`;
      const locais = [
        "Parque Assis Brasil",
        "Pista Central",
        "Arena 2",
        "Pavilhão A",
        "Arena Principal",
      ];
      const location = locais[(day + i) % locais.length];
      const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(
        id
      )}/800/450`;
      const key = ymd(date);
      if (!map[key])
        map[key] = { title: fmtHeaderDate(date), dateKey: key, data: [] };
      map[key].data.push({
        id,
        title,
        start,
        end,
        location,
        imageUrl,
        category,
      });
    }
  }
  return Object.values(map)
    .sort((a, b) => (a.dateKey < b.dateKey ? -1 : 1))
    .map((s) => ({
      ...s,
      data: s.data.sort((a, b) => a.start.getTime() - b.start.getTime()),
    }));
}

export default function AgendaScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 novo
  const [selectedCategory, setSelectedCategory] = useState<"Todos" | Category>(
    "Todos"
  );
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const sections = useMemo(buildFakeSections, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filteredSections = useMemo(() => {
    if (selectedCategory === "Todos") return sections;
    const out: EventSection[] = [];
    for (const sec of sections) {
      const data = sec.data.filter((e) => e.category === selectedCategory);
      if (data.length) out.push({ ...sec, data });
    }
    return out;
  }, [sections, selectedCategory]);

  const toggleReminder = (id: string, title: string, start: Date) => {
    setReminders((prev) => {
      const enabled = !prev[id];
      Toast.show({
        type: enabled ? "success" : "info",
        text1: enabled ? "Lembrete ativado" : "Lembrete removido",
        text2: enabled
          ? `Avisaremos perto de ${fmtTime(start)} • ${title}`
          : title,
      });
      return { ...prev, [id]: enabled };
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  }, []);

  const renderSectionHeader = ({ section }: { section: EventSection }) => (
    <View className="bg-background px-4 pt-5">
      <Text className="text-white text-lg font-extrabold">{section.title}</Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: EventItem; index: number }) => {
    const active = !!reminders[item.id];
    return (
      <Animated.View
        entering={FadeInUp.delay((index % 6) * 40).springify()}
        className="mx-4 mt-3 rounded-2xl overflow-hidden bg-surface border border-white/10"
      >
        <View className="relative">
          <Image
            source={{ uri: item.imageUrl }}
            className="w-full h-40"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/10" />
          <View className="absolute top-3 left-3 bg-black/40 border border-white/20 rounded-full px-3 py-1.5">
            <Text className="text-white text-xs font-semibold">
              {item.category}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleReminder(item.id, item.title, item.start)}
            className="absolute top-3 right-3 flex-row items-center rounded-full border border-white/20 bg-black/40 px-3 py-1.5"
          >
            {active ? (
              <>
                <BellRing size={16} color="#FDE68A" />
                <Text className="text-white text-xs font-semibold ml-1">
                  Ativado
                </Text>
              </>
            ) : (
              <>
                <Bell size={16} color="#E5E7EB" />
                <Text className="text-white text-xs font-semibold ml-1">
                  Avise-me
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View className="p-4">
          <Text
            className="text-white text-base font-semibold"
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <View className="flex-row items-center gap-3 mt-3">
            <CalendarDays size={18} color="#9CA3AF" />
            <Text className="text-text-secondary">
              {fmtTime(item.start)} – {fmtTime(item.end)}
            </Text>
          </View>
          <View className="flex-row items-center gap-3 mt-2">
            <MapPin size={18} color="#9CA3AF" />
            <Text className="text-text-secondary">{item.location}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const keyExtractor = (item: EventItem) => item.id;

  const ListHeader = () => (
    <View className="bg-background">
      <View className="px-4 pt-4 pb-2 border-b border-white/10">
        <Text className="text-white text-2xl font-extrabold">Agenda</Text>
        <Text className="text-text-secondary mt-1">
          Eventos, provas e transmissões
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
      >
        {["Todos", ...CATEGORIES].map((cat) => {
          const active = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat as any)}
              className={`mr-2 px-4 py-2 rounded-full border ${
                active
                  ? "bg-accent border-accent"
                  : "bg-surface border-white/10"
              }`}
            >
              <Text
                className={
                  active
                    ? "text-white text-xs font-semibold"
                    : "text-text-secondary text-xs font-semibold"
                }
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <TabTransition variant="slide">
      <TopBar
        logo={require("@/assets/cavalo_crioulo.png")}
        onPressSearch={() => {}}
        onPressCast={() => {}}
        avatar={require("@/assets/avatar.jpg")}
      />
      <View className="flex-1 bg-background">
        {loading ? (
          <View className="pb-6">
            {[0, 1, 2].map((d) => (
              <View key={d}>
                <SkeletonSectionHeader />
                {[0, 1, 2].map((i) => (
                  <SkeletonEventCard key={`${d}-${i}`} />
                ))}
              </View>
            ))}
          </View>
        ) : (
          <SectionList
            sections={filteredSections}
            keyExtractor={keyExtractor}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            stickySectionHeadersEnabled
            ListHeaderComponent={ListHeader}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#fff"
              />
            }
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </TabTransition>
  );
}
