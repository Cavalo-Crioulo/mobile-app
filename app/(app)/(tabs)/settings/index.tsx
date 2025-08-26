import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import i18n from "@/i18n";
import { useAuth } from "@/lib/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { SignOutButton } from "@/components/SignOutButton";
import { useTranslation } from "react-i18next";
import { ScreenTransition } from "@/components/ScreenTransition";
import { useRouter } from "expo-router";

type Lang = "pt" | "en" | "es";

export default function SettingsHome() {
  const router = useRouter();

  const { session } = useAuth();
  const { t } = useTranslation("settings");
  const [langModal, setLangModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const userEmail = session?.user?.email ?? "";
  const currentLang = (i18n.language?.split("-")[0] as Lang) || "pt";

  async function applyLanguage(lang: Lang) {
    await i18n.changeLanguage(lang);
    if (session) await supabase.auth.updateUser({ data: { lang } });
    setLangModal(false);
  }

  return (
    <ScreenTransition variant="fade">
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ padding: 16 }}
      >
        <View className="items-center mb-6">
          <Image
            source={require("@/assets/avatar.jpg")}
            style={{ width: 96, height: 96, borderRadius: 9999 }}
          />
          <Text className="text-white text-lg mt-3 font-semibold">
            {session?.user?.user_metadata?.full_name ??
              t("menus.personal_data")}
          </Text>
          <Text className="text-text-secondary">{userEmail}</Text>
        </View>

        <View className="bg-surface rounded-2xl p-2">
          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-4 border-b border-white/10"
            onPress={() => {
              router.push("/(tabs)/settings/dados-pessoais");
            }}
          >
            <Text className="text-white text-base">
              {t("menus.personal_data")}
            </Text>
            <Text className="text-text-secondary">{">"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-4 border-b border-white/10"
            onPress={() => setLangModal(true)}
          >
            <Text className="text-white text-base">{t("menus.language")}</Text>
            <Text className="text-text-secondary">
              {t(`languages.${currentLang}`)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-4 border-b border-white/10"
            onPress={() => {router.push("/(tabs)/settings/politica-privacidade")}}
          >
            <Text className="text-white text-base">
              {t("menus.privacy_policy")}
            </Text>
            <Text className="text-text-secondary">{">"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-4"
            onPress={() => {router.push("/(tabs)/settings/termos-de-uso")}}
          >
            <Text className="text-white text-base">
              {t("menus.terms_of_use")}
            </Text>
            <Text className="text-text-secondary">{">"}</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <SignOutButton label={t("menus.logout")} />
        </View>

        {/* Modal de Língua */}
        <Modal
          visible={langModal}
          transparent
          animationType="fade"
          onRequestClose={() => setLangModal(false)}
        >
          <Pressable
            className="flex-1 bg-black/50 justify-center p-6"
            onPress={() => setLangModal(false)}
          >
            <Pressable
              className="bg-white rounded-2xl p-4"
              onPress={(e) => e.stopPropagation()}
            >
              <Text className="text-[#111827] text-base font-semibold mb-3">
                {t("dialogs.choose_language")}
              </Text>
              {(["pt", "en", "es"] as Lang[]).map((l) => (
                <TouchableOpacity
                  key={l}
                  className="px-3 py-3 rounded-xl mb-2 bg-gray-100"
                  onPress={() => applyLanguage(l)}
                >
                  <Text className="text-[#111827]">{t(`languages.${l}`)}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                className="mt-2 items-center"
                onPress={() => setLangModal(false)}
              >
                <Text className="text-[#6B7280]">{t("dialogs.cancel")}</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Modal de exclusão (se mantiver) */}
        <Modal
          visible={deleteModal}
          transparent
          animationType="fade"
          onRequestClose={() => setDeleteModal(false)}
        >
          <Pressable
            className="flex-1 bg-black/50 justify-center p-6"
            onPress={() => setDeleteModal(false)}
          >
            <Pressable
              className="bg-white rounded-2xl p-4"
              onPress={(e) => e.stopPropagation()}
            >
              <Text className="text-[#111827] text-base font-semibold mb-2">
                {t("dialogs.delete_title")}
              </Text>
              <Text className="text-[#374151] mb-4">
                {t("dialogs.delete_desc")}
              </Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="flex-1 bg-gray-200 rounded-xl py-3 items-center"
                  onPress={() => setDeleteModal(false)}
                >
                  <Text className="text-[#111827] font-semibold">
                    {t("dialogs.delete_cancel")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-error rounded-xl py-3 items-center"
                  onPress={() => setDeleteModal(false)}
                >
                  <Text className="text-white font-semibold">
                    {t("dialogs.delete_confirm")}
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </ScrollView>
    </ScreenTransition>
  );
}
