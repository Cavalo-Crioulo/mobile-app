import { View, Text, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & { label?: string; errorText?: string };

export function Input({ label, errorText, ...rest }: Props) {
  return (
    <View className="gap-2">
      {label && <Text className="text-foreground font-medium">{label}</Text>}
      <TextInput
        className="h-12 px-4 rounded-2xl bg-card text-foreground"
        placeholderTextColor="#9CA3AF"
        {...rest}
      />
      {!!errorText && <Text className="text-red-400 text-xs">{errorText}</Text>}
    </View>
  );
}
