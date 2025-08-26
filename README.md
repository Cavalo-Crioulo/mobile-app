# 📱 Cavalo Crioulo App

Aplicativo mobile desenvolvido em **React Native (Expo)** para comunicação e gestão de eventos do Cavalo Crioulo. O projeto está estruturado com **Expo Router + NativeWind (Tailwind) + Supabase (backend)**, seguindo boas práticas de modularização e design system.

---

## ⚙️ Stack de Tecnologias
- **Frontend Mobile:** React Native (Expo) + TypeScript
- **Navegação:** Expo Router
- **Estilização:** Tailwind CSS via NativeWind
- **Componentes UI:** Shadcn-like (Button, Card, Input, Tabs, Toast)
- **Gerenciamento de Estado Local:** Hooks e Context API
- **Backend:** Supabase (PostgreSQL + RLS)
- **Auth:** Supabase Auth
- **Storage:** Cloudflare Images / Supabase Storage
- **APIs:** YouTube, Facebook, Nimble Streamer
- **Outros:** Stripe, Push Notifications, Bunny CDN

---

## 🗂️ Estrutura de Pastas
```
cavalo-crioulo-app/
│
├── app/                        # Expo Router - navegação declarativa
│   ├── (auth)/                 # Fluxos de autenticação
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── forgot.tsx
│   │   └── onboarding.tsx
│   ├── (tabs)/                 # Área principal com Bottom Tabs
│   │   ├── _layout.tsx         # Configuração das tabs (Home, Eventos, Config)
│   │   ├── index.tsx           # Home
│   │   ├── eventos.tsx         # Agenda de eventos
│   │   └── settings.tsx        # Configurações
│   └── _layout.tsx             # Layout raiz (SafeArea + StatusBar)
│
├── src/
│   ├── components/             # UI compartilhável
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Tabs.tsx
│   │   ├── Toast.tsx
│   │   └── Screen.tsx          # Wrapper com SafeArea + StatusBar
│   ├── features/               # Pastas por funcionalidade
│   │   ├── auth/
│   │   ├── home/
│   │   ├── eventos/
│   │   ├── noticias/
│   │   └── settings/
│   ├── lib/                    # utilitários globais
│   │   ├── theme.ts
│   │   └── utils/
│   ├── mocks/                  # dados fake
│   │   └── fixtures.ts         # getUpcomingStreams, getNewsList, getHighlights, getEventCalendar
│   └── services/               # clientes de API (Supabase, etc.)
│
├── assets/                     # ícones, imagens, fontes
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── app.json
```

---

## 🎨 UI e Layouts
- **SafeArea + StatusBar:** Todas as telas usam o wrapper `Screen` para respeitar áreas seguras e controlar a cor dos ícones da status bar.
- **Bottom Tabs:** Home, Eventos, Configurações com ícones `lucide-react-native`.
- **Auth:** Telas de login, cadastro, recuperação de senha e onboarding prontas para integração com Supabase Auth.

---

## 📊 Mocks
O arquivo `src/mocks/fixtures.ts` fornece dados fake para prototipagem:
- `getUpcomingStreams` → transmissões ativas
- `getNewsList` → notícias
- `getHighlights` → destaques
- `getEventCalendar` → agenda formatada `{ id, title, date, city, uf }`

---

## ✅ Progresso Atual
- Estrutura inicial criada com **Expo Router**.
- Configuração do **NativeWind** (Tailwind 3.4+).
- Ajustes no `babel.config.js` para evitar conflitos.
- Implementação de **tabs navegáveis**.
- Remoção do header padrão e uso de **SafeArea + StatusBar**.
- Criação de wrapper `Screen` para padronizar layouts.
- Definição de mocks para **eventos, transmissões e notícias**.

---

## 🚀 Próximos Passos
1. Implementar telas de autenticação conectadas ao Supabase.
2. Substituir mocks por dados reais via Supabase.
3. Integrar player de vídeo (LL-HLS, RTMP, SRT via Nimble Streamer).
4. Implementar agenda completa com lembretes e notificações push.
5. Criar módulo de gerenciamento de eventos no app e dashboard web.

---

📌 Projeto salvo como **Cavalo Crioulo App** — em desenvolvimento contínuo.