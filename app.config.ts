// app.config.ts
import "dotenv/config";
import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Cavalo Crioulo App",
  slug: "cavalo-crioulo-app",
  scheme: "cavalocrioulo",
  extra: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};

export default config;
