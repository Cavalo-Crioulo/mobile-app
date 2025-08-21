// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // Aqui você pode escolher para onde ir (ex: tabs, home, login etc)
  return <Redirect href="/(app)/(tabs)" />;
}
