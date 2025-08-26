import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// use as envs EXPO_PUBLIC_*
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage, // <— persistência no dispositivo
    autoRefreshToken: true,
    persistSession: true, // <— mantém sessão entre reinícios
    detectSessionInUrl: false, // RN não usa URL callback como web
  },
});
