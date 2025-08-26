import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Cast, Search } from "lucide-react-native";

type Section = { key: string; label: string };

type Props = {
  logo: ImageSourcePropType;
  onPressLogo?: () => void;
  onPressSearch?: () => void;
  onPressCast?: () => void;

  // 👇 avatar
  avatar?: ImageSourcePropType; // ex.: require(...) OU { uri }
  onPressAvatar?: () => void;

  sections?: Section[]; // abas (opcional)
  activeKey?: string;
  onChangeSection?: (key: string) => void;
};

export function TopBar({
  logo,
  onPressLogo,
  onPressSearch,
  onPressCast,
  avatar,
  onPressAvatar,
  sections = [],
  activeKey,
  onChangeSection,
}: Props) {
  return (
    <View>
      {/* Linha principal */}
      <View
        className="
          h-14 flex-row items-center justify-between
          px-4 bg-surface
          border-b border-white/10
          shadow-md
        "
      >
        {/* Logo à esquerda */}
        <TouchableOpacity
          onPress={onPressLogo}
          activeOpacity={onPressLogo ? 0.8 : 1}
          className="flex-row items-center"
        >
          <Image source={logo} className="w-28 h-6" resizeMode="contain" />
        </TouchableOpacity>

        {/* Ações à direita: Search, Cast, Avatar */}
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={onPressSearch}
            className="p-1"
            activeOpacity={0.8}
            accessibilityLabel="Buscar"
          >
            <Search size={22} color="#E5E7EB" strokeWidth={2.2} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPressCast}
            className="p-1"
            activeOpacity={0.8}
            accessibilityLabel="Chromecast"
          >
            <Cast size={22} color="#E5E7EB" strokeWidth={2.2} />
          </TouchableOpacity>

          {/* Avatar ao lado do ícone Cast */}
          <TouchableOpacity
            onPress={onPressAvatar}
            activeOpacity={0.85}
            className="rounded-full overflow-hidden border border-white/10"
            accessibilityLabel="Perfil"
          >
            <Image
              source={
                avatar ??
                // fallback simples (troque por seu placeholder, se tiver)
                require("@/assets/avatar.jpg")
              }
              className="w-8 h-8 rounded-full"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Abas (opcionais) */}
      {sections.length > 0 && (
        <View className="bg-surface border-b border-white/10">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          >
            <View className="flex-row items-center">
              {sections.map((s) => {
                const active = s.key === activeKey;
                return (
                  <TouchableOpacity
                    key={s.key}
                    className="px-3 py-3"
                    activeOpacity={0.85}
                    onPress={() => onChangeSection?.(s.key)}
                  >
                    <Text
                      className={
                        active
                          ? "text-white text-[13px] font-semibold"
                          : "text-text-secondary text-[13px] font-medium"
                      }
                    >
                      {s.label}
                    </Text>
                    <View
                      className={
                        active
                          ? "h-0.5 w-6 bg-white rounded-full mt-1"
                          : "h-0.5 w-6 mt-1"
                      }
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
