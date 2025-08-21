import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      {/* Outras rotas de detalhe, se existirem: */}
      {/* <Stack.Screen name="transmissao/[id]" /> */}
      {/* <Stack.Screen name="noticia/[id]" /> */}
    </Stack>
  );
}
