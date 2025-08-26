import { useMemo, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert, ScrollView
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/lib/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

export default function DadosPessoais() {
  const router = useRouter();
  const { session } = useAuth();
  const { t } = useTranslation("settings");

  const Schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("personal_data.name") + " - " + "min 2"),
        age: z.string().regex(/^\d{1,3}$/, "Idade inválida").optional().or(z.literal("")),
        email: z.string().email("E-mail inválido"),
        phone: z.string().optional(),
        bio: z.string().max(300, "Máx. 300").optional().or(z.literal("")),
      }),
    [t]
  );

  type FormData = z.infer<typeof Schema>;

  const user = session?.user;
  const defaults: FormData = useMemo(
    () => ({
      name: (user?.user_metadata?.full_name as string) || "",
      age: (user?.user_metadata?.age as string) || "",
      email: user?.email || "",
      phone: (user?.user_metadata?.phone as string) || "",
      bio: (user?.user_metadata?.bio as string) || "",
    }),
    [user]
  );

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues: defaults,
    values: defaults,
  });

  async function onSave(values: FormData) {
    try {
      const { error } = await supabase.auth.updateUser({
        email: values.email,
        data: {
          full_name: values.name,
          age: values.age,
          phone: values.phone,
          bio: values.bio,
        },
      });
      if (error) throw error;
      Alert.alert("OK", t("personal_data.save") + " ✅");
      router.back();
    } catch (e: any) {
      Alert.alert("Erro", e?.message ?? "Não foi possível salvar.");
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {/* Header simples */}
        <TouchableOpacity className="mb-4" onPress={() => router.back()}>
          <Text className="text-text-secondary">{"<"} {t("title")}</Text>
        </TouchableOpacity>

        {/* Avatar */}
        <View className="items-center mb-6">
          <Image
            source={require("@/assets/avatar.jpg")}
            style={{ width: 96, height: 96, borderRadius: 9999 }}
          />
          <TouchableOpacity
            className="mt-3 bg-surface px-4 py-2 rounded-xl border border-white/10"
            onPress={() => Alert.alert("Avatar", t("personal_data.avatar"))}
          >
            <Text className="text-white">{t("personal_data.avatar")}</Text>
          </TouchableOpacity>
        </View>

        {/* Card */}
        <View className="bg-surface rounded-2xl p-4">
          {/* Nome */}
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <View className="mb-3">
                <Text className="text-text-primary mb-1">{t("personal_data.name")}</Text>
                <TextInput
                  className="bg-white rounded-xl px-4 py-3 text-[#111827]"
                  placeholder={t("personal_data.name")}
                  {...field}
                />
                {errors.name && <Text className="text-error mt-1">{String(errors.name.message)}</Text>}
              </View>
            )}
          />

          {/* Idade */}
          <Controller
            control={control}
            name="age"
            render={({ field }) => (
              <View className="mb-3">
                <Text className="text-text-primary mb-1">{t("personal_data.age")}</Text>
                <TextInput
                  className="bg-white rounded-xl px-4 py-3 text-[#111827]"
                  placeholder="Ex.: 30"
                  keyboardType="number-pad"
                  {...field}
                />
                {errors.age && <Text className="text-error mt-1">{String(errors.age.message)}</Text>}
              </View>
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <View className="mb-3">
                <Text className="text-text-primary mb-1">{t("personal_data.email")}</Text>
                <TextInput
                  className="bg-white rounded-xl px-4 py-3 text-[#111827]"
                  placeholder="voce@email.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  {...field}
                />
                {errors.email && <Text className="text-error mt-1">{String(errors.email.message)}</Text>}
              </View>
            )}
          />

          {/* Telefone */}
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <View className="mb-3">
                <Text className="text-text-primary mb-1">{t("personal_data.phone")}</Text>
                <TextInput
                  className="bg-white rounded-xl px-4 py-3 text-[#111827]"
                  placeholder="(xx) xxxxx-xxxx"
                  keyboardType="phone-pad"
                  {...field}
                />
              </View>
            )}
          />

          {/* Descrição */}
          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <View>
                <Text className="text-text-primary mb-1">{t("personal_data.bio")}</Text>
                <TextInput
                  className="bg-white rounded-xl px-4 py-3 text-[#111827]"
                  placeholder={t("personal_data.bio")}
                  multiline
                  numberOfLines={4}
                  {...field}
                />
                {errors.bio && <Text className="text-error mt-1">{String(errors.bio.message)}</Text>}
              </View>
            )}
          />

          <TouchableOpacity
            className={`mt-5 rounded-xl items-center py-3 ${isValid ? "bg-success" : "bg-gray-400"}`}
            onPress={handleSubmit(onSave)}
            disabled={!isValid}
          >
            <Text className="text-white font-semibold">{t("personal_data.save")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
