// src/components/SignOutButton.tsx
import { TouchableOpacity, Text } from "react-native";
import { useAuth } from "@/lib/hooks/useAuth";

export function SignOutButton({ label = "Sair" }: { label?: string }) {
  const { signOut } = useAuth();
  return (
    <TouchableOpacity
      className="bg-error px-4 py-3 rounded-xl items-center"
      onPress={signOut}
      accessibilityRole="button"
    >
      <Text className="text-white font-semibold">{label}</Text>
    </TouchableOpacity>
  );
}
