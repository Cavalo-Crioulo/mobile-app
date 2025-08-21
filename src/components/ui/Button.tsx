import { Pressable, Text, ActivityIndicator } from "react-native";

type Props = {
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  title = "OK",
  onPress,
  loading,
  disabled,
  variant = "primary",
}: Props) {
  const base = "h-12 rounded-2xl items-center justify-center px-4";
  const variants: Record<typeof variant, string> = {
    primary: "bg-primary",
    secondary: "bg-card",
    ghost: "bg-transparent",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${disabled ? "opacity-60" : ""}`}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text className={`text-foreground font-semibold`}>{title}</Text>
      )}
    </Pressable>
  );
}
