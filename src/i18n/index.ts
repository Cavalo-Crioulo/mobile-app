// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// importa os JSONs de tradução
import ptAuth from "./locales/pt/auth.json";
import enAuth from "./locales/en/auth.json";
import esAuth from "./locales/es/auth.json";

// SETTINGS 👇 ADICIONE
import ptSettings from "./locales/pt/settings.json";
import enSettings from "./locales/en/settings.json";
import esSettings from "./locales/es/settings.json";

// detecta idioma do dispositivo
function deviceLanguage(): "pt" | "en" | "es" {
  const tag = Localization.getLocales()?.[0]?.languageTag ?? "pt-BR";
  const base = tag.split("-")[0].toLowerCase();
  if (["pt", "en", "es"].includes(base)) return base as any;
  return "pt";
}

i18n.use(initReactI18next).init({
  resources: {
    pt: { auth: ptAuth, settings: ptSettings },
    en: { auth: enAuth, settings: enSettings },
    es: { auth: esAuth, settings: esSettings },
  },
  lng: deviceLanguage(), // idioma inicial
  fallbackLng: "pt",
  supportedLngs: ["pt", "en", "es"],
  ns: ["auth"], // namespaces carregados
  defaultNS: "auth", // namespace padrão
  load: "languageOnly",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
