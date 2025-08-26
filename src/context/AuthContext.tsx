import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter, useSegments, useRootNavigationState } from "expo-router";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import i18n from "@/i18n"; // garante que seu caminho/alias esteja correto

type SignInPayload = { email: string; password: string };
type SupportedLang = "pt" | "en" | "es";

interface AuthCtx {
  session: Session | null;
  loading: boolean; // true enquanto carrega a sessão inicial
  signIn: (v: SignInPayload) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const segments = useSegments();
  const navState = useRootNavigationState(); // evita redirect antes do Router hidratar

  // 1) Carrega sessão persistida e observa mudanças
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoading(false);

      // aplica idioma dos metadados, se existir
      const lang = data.session?.user?.user_metadata?.lang as SupportedLang | undefined;
      if (lang && isSupportedLang(lang)) i18n.changeLanguage(lang);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);

      // sempre que a sessão mudar, tenta aplicar idioma do usuário
      const lang = newSession?.user?.user_metadata?.lang as SupportedLang | undefined;
      if (lang && isSupportedLang(lang)) i18n.changeLanguage(lang);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // 2) Guarda de rotas (só roda quando loading=false E router pronto)
  useEffect(() => {
    if (loading || !navState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";
    if (!session && !inAuthGroup) {
      // usuário deslogado tentando acessar rota protegida
      router.replace("/login"); // app/(auth)/login.tsx
      return;
    }
    if (session && inAuthGroup) {
      // usuário logado em tela pública
      router.replace("/home"); // app/(tabs)/home.tsx
      return;
    }
  }, [loading, navState?.key, session, segments]);

  // 3) API exposta
  const value = useMemo<AuthCtx>(
    () => ({
      session,
      loading,
      signIn: (v) => supabase.auth.signInWithPassword(v),
      signOut: async () => {
        await supabase.auth.signOut();
      },
    }),
    [session, loading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthContext must be inside AuthProvider");
  return ctx;
}

// util simples para validar idiomas suportados
function isSupportedLang(lang: string): lang is SupportedLang {
  return lang === "pt" || lang === "en" || lang === "es";
}
