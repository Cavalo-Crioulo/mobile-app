import { useMemo, useState } from "react";
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
import { useAuth } from "@/lib/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { Separator } from "@/components/ui/Separator";
import { useTranslation } from "react-i18next";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { t } = useTranslation("auth"); // namespace "auth" (ex.: auth.json)

  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Schema com mensagens traduzidas
  const LoginSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, t("errors.email_required"))
          .email(t("errors.email_invalid")),
        password: z
          .string()
          .min(6, t("errors.password_min")),
      }),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginForm) {
    try {
      setSubmitting(true);
      const { error } = await signIn(values);
      if (error) throw error;

      Toast.show({
        type: "success",
        text1: t("toast.login_success_title"),
        text2: t("toast.login_success_desc"),
      });
      // Não navegue aqui; o AuthProvider já redireciona quando a sessão muda.
    } catch (e: any) {
      Alert.alert(t("alerts.login_error_title"), e?.message ?? t("alerts.try_again"));
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
        <View className="bg-white rounded-2xl p-5 mb-6 mt-10 w-full">
          {/* E-mail */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-3">
                <Text className="text-gray-700 mb-1">{t("fields.email.label")}</Text>
                <TextInput
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                  placeholder={t("fields.email.placeholder")}
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  accessibilityLabel={t("fields.email.a11y")}
                  returnKeyType="next"
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
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-2">
                <Text className="text-gray-700 mb-1">{t("fields.password.label")}</Text>
                <View className="relative">
                  <TextInput
                    className="border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-900"
                    placeholder={t("fields.password.placeholder")}
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    accessibilityLabel={t("fields.password.a11y")}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                  <TouchableOpacity
                    className="absolute right-3 top-3.5"
                    onPress={() => setShowPassword((v) => !v)}
                    accessibilityLabel={
                      showPassword ? t("fields.password.hide") : t("fields.password.show")
                    }
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={22}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-600 mt-1">{errors.password.message}</Text>
                )}
              </View>
            )}
          />

          {/* Botão Entrar */}
          <TouchableOpacity
            className={`mt-4 rounded-xl items-center py-3 ${
              isValid && !submitting ? "bg-[#4CAF50]" : "bg-gray-300"
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || submitting}
            accessibilityLabel={t("actions.sign_in")}
          >
            <Text className="text-white font-semibold">
              {submitting ? t("actions.signing_in") : t("actions.sign_in")}
            </Text>
          </TouchableOpacity>

          {/* Esqueci a senha */}
          <View className="mt-4 items-end space-y-3">
            <TouchableOpacity onPress={() => router.push("/forgot")}>
              <Text className="text-[#1A1A1D]">{t("links.forgot_password")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cadastro + separador */}
        <View className="items-center space-y-3">
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text className="text-text-primary">
              {t("links.no_account")} {t("links.register")}
            </Text>
          </TouchableOpacity>

          <View className="flex flex-row justify-around items-center w-2/3">
            <Separator label={t("separator.or")} />
          </View>
        </View>

        {/* Social login (exemplo) */}
        <View className="flex-row justify-center space-x-8">
          <TouchableOpacity
            className="items-center justify-center w-12 h-12 rounded-full bg-white"
            onPress={() => Alert.alert("Google", t("oauth.integrate_google"))}
            accessibilityLabel={t("oauth.google")}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center justify-center w-12 h-12 rounded-full bg-white"
            onPress={() => Alert.alert("Facebook", t("oauth.integrate_facebook"))}
            accessibilityLabel={t("oauth.facebook")}
          >
            <Ionicons name="logo-facebook" size={24} color="#4267B2" />
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center justify-center w-12 h-12 rounded-full bg-white"
            onPress={() => Alert.alert("Apple", t("oauth.integrate_apple"))}
            accessibilityLabel={t("oauth.apple")}
          >
            <Ionicons name="logo-apple" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
