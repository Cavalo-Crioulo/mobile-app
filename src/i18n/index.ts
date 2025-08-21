import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { languageDetector } from "./detector";

// Recursos inline (pode-se carregar via import JSON)
import pt from "./locales/pt/common.json";
import en from "./locales/en/common.json";
import es from "./locales/es/common.json";

void i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: {
      pt: { common: pt },
      en: { common: en },
      es: { common: es },
    },
    fallbackLng: "pt",
    // tenta linguagem do sistema: pt-BR -> pt
    supportedLngs: ["pt", "en", "es"],
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    returnNull: false,
  });

export default i18n;
