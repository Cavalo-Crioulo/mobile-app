import { useState, useMemo } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  View,
  Text,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

type RecoverForm = { email: string };

export default function ForgotScreen() {
  const { t } = useTranslation("auth");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const RecoverSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, t("errors.email_required"))
          .email(t("errors.email_invalid")),
      }),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RecoverForm>({
    resolver: zodResolver(RecoverSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  async function onSubmit({ email }: RecoverForm) {
    try {
      setSubmitting(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "cavalocrioulo://reset", // ajuste para seu deep link
      });
      if (error) throw error;
      Alert.alert(t("alerts.reset_sent_title"), t("alerts.reset_sent_desc"));
      router.replace("/login");
    } catch (e: any) {
      Alert.alert(t("alerts.reset_error_title"), e?.message ?? t("alerts.try_again"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-[#0B0B0C]"
    >
      <View className="flex-1 justify-center px-6">
        {/* Logo */}
        <View className="items-center mb-10">
          <Image
            source={require("@/assets/cavalo_crioulo.png")}
            style={{ width: 180, height: 90, resizeMode: "contain" }}
            accessibilityLabel={t("a11y.logo")}
          />
        </View>

        {/* Card */}
        <View className="bg-white rounded-2xl p-5 mb-6">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <View>
                <Text className="text-gray-700 mb-1">{t("fields.email.label")}</Text>
                <TextInput
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                  placeholder={t("fields.email.placeholder")}
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  {...field}
                />
                {errors.email && (
                  <Text className="text-red-600 mt-1">{errors.email.message}</Text>
                )}
              </View>
            )}
          />

          {/* Botão enviar */}
          <TouchableOpacity
            className={`mt-4 rounded-xl items-center py-3 ${
              isValid && !submitting ? "bg-[#4CAF50]" : "bg-gray-300"
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || submitting}
          >
            <Text className="text-white font-semibold">
              {submitting ? t("actions.sending") : t("actions.recover")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Voltar */}
        <TouchableOpacity className="items-center" onPress={() => router.replace("/login")}>
          <Text className="text-text-primary">{t("links.back_to_login")}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
