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

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const { t } = useTranslation("auth");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const SignUpSchema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(2, t("errors.name_required")),
          email: z
            .string()
            .min(1, t("errors.email_required"))
            .email(t("errors.email_invalid")),
          password: z.string().min(6, t("errors.password_min")),
          confirmPassword: z.string().min(6, t("errors.password_min")),
        })
        .refine((data) => data.password === data.confirmPassword, {
          path: ["confirmPassword"],
          message: t("errors.password_mismatch"),
        }),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit({ name, email, password }: SignUpForm) {
    try {
      setSubmitting(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;

      Alert.alert(t("alerts.signup_success_title"), t("alerts.signup_success_desc"));
      router.replace("/login");
    } catch (e: any) {
      Alert.alert(t("alerts.signup_error_title"), e?.message ?? t("alerts.try_again"));
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
          {/* Nome */}
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <View className="mb-3">
                <Text className="text-gray-700 mb-1">{t("fields.name.label")}</Text>
                <TextInput
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                  placeholder={t("fields.name.placeholder")}
                  placeholderTextColor="#9CA3AF"
                  {...field}
                />
                {errors.name && (
                  <Text className="text-red-600 mt-1">{errors.name.message}</Text>
                )}
              </View>
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <View className="mb-3">
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

          {/* Senha */}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <View className="mb-3">
                <Text className="text-gray-700 mb-1">{t("fields.password.label")}</Text>
                <TextInput
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                  placeholder={t("fields.password.placeholder")}
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  {...field}
                />
                {errors.password && (
                  <Text className="text-red-600 mt-1">{errors.password.message}</Text>
                )}
              </View>
            )}
          />

          {/* Confirmar senha */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <View>
                <Text className="text-gray-700 mb-1">
                  {t("fields.confirm_password.label")}
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                  placeholder={t("fields.confirm_password.placeholder")}
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  {...field}
                />
                {errors.confirmPassword && (
                  <Text className="text-red-600 mt-1">{errors.confirmPassword.message}</Text>
                )}
              </View>
            )}
          />

          {/* Botão cadastrar */}
          <TouchableOpacity
            className={`mt-4 rounded-xl items-center py-3 ${
              isValid && !submitting ? "bg-[#4CAF50]" : "bg-gray-300"
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || submitting}
          >
            <Text className="text-white font-semibold">
              {submitting ? t("actions.registering") : t("actions.register")}
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
