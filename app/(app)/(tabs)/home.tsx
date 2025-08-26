import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";

import { TopBar } from "@/components/TopBar";
import { HeroBanner } from "@/components/home/HeroBanner";
import { Row } from "@/components/home/Row";
import { TabTransition } from "@/components/TabTransition";

// skeletons
import { SkeletonHero, SkeletonRow } from "@/components/home/Skeletons";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simula carregamento de dados
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <TabTransition variant="slide">
      <View className="flex-1 bg-background">
        <TopBar
          logo={require("@/assets/cavalo_crioulo.png")}
          onPressSearch={() => {}}
          onPressCast={() => {}}
          avatar={require("@/assets/avatar.jpg")}
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
        >
          {loading ? (
            <>
              <SkeletonHero />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : (
            <>
              <HeroBanner
                title="Cavalo Crioulo em Pista"
                subtitle="Cobertura especial dos grandes eventos"
                imageUrl="https://picsum.photos/seed/heroCrioulo/1200/600"
              />
              <Row
                title="Continuar assistindo"
                data={[
                  { id: "c1", title: "Prova de Laço - etapa 2", imageUrl: "https://picsum.photos/seed/ca1/400/600" },
                  { id: "c2", title: "Freio de Ouro - melhores momentos", imageUrl: "https://picsum.photos/seed/ca2/400/600" },
                  { id: "c3", title: "Treinamento de pista", imageUrl: "https://picsum.photos/seed/ca3/400/600" },
                ]}
              />
              <Row
                title="Destaques"
                data={[
                  { id: "d1", title: "Documentário: Raça Crioula", imageUrl: "https://picsum.photos/seed/d1/400/600" },
                  { id: "d2", title: "Grandes Campeões", imageUrl: "https://picsum.photos/seed/d2/400/600" },
                  { id: "d3", title: "Criações Premiadas", imageUrl: "https://picsum.photos/seed/d3/400/600" },
                  { id: "d4", title: "Histórias de Pista", imageUrl: "https://picsum.photos/seed/d4/400/600" },
                ]}
              />
            </>
          )}
        </ScrollView>
      </View>
    </TabTransition>
  );
}
