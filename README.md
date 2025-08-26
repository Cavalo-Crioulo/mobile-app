# Patch Pack — Cavalo Crioulo **mobile-app**

> Pacote para dar prosseguimento rápido no app (Expo + Expo Router + NativeWind + Supabase). Inclui **README.md**, **rotas base**, **auth com Supabase**, **mocks de eventos** e **ajustes de layout** (SafeArea + StatusBar).

---

## ✅ O que este pacote entrega

1. **README.md** completo (setup, scripts, estrutura, env).
2. **Rotas** com Expo Router:

   * `(auth)/login`
   * `(tabs)/home`, `(tabs)/eventos`, `(tabs)/perfil`
   * `eventos/[id]`
3. **Autenticação**: `AuthProvider` com **guardião de rotas** (redireciona login ⇄ tabs).
4. **Mocks**: `src/mocks/events.ts` e `src/mocks/getEventCalendar.ts`.
5. **Infra**: `src/lib/supabase.ts`, `src/hooks/useAuth.ts`, `app/_layout.tsx`.
6. **UI base**: SafeAreaView + StatusBar configurados.

> Basta copiar estes arquivos para o repo e ajustar as chaves do Supabase.

---

## 📁 Estrutura sugerida

```
mobile-app/
├─ app/
│  ├─ _layout.tsx
│  ├─ (auth)/
│  │  └─ login.tsx
│  ├─ (tabs)/
│  │  ├─ _layout.tsx
│  │  ├─ home.tsx
│  │  ├─ eventos.tsx
│  │  └─ perfil.tsx
│  └─ eventos/
│     └─ [id].tsx
├─ src/
│  ├─ lib/
│  │  └─ supabase.ts
│  ├─ context/
│  │  └─ AuthContext.tsx
│  ├─ hooks/
│  │  └─ useAuth.ts
│  └─ mocks/
│     ├─ events.ts
│     └─ getEventCalendar.ts
├─ app.config.ts
├─ README.md (novo)
└─ ... (arquivos existentes)
```

---

## 1) `README.md`

> **Crie/Substitua** o `README.md` do projeto com o conteúdo abaixo.

````md
# Cavalo Crioulo App (mobile-app)

Aplicativo **Expo + React Native + Expo Router** para comunicação e eventos ao vivo do universo do Cavalo Crioulo.

## 🚀 Stack
- Expo + React Native (TypeScript)
- Expo Router (navegação por arquivos)
- NativeWind (Tailwind RN)
- Supabase (Auth + DB)

## ✅ Requisitos
- Node.js 20+
- Expo CLI (`npm i -g expo`)

## 🔧 Configuração
1. **Dependências**
   ```bash
   npm install
   # ou pnpm i / yarn
````

2. **Variáveis de ambiente (Supabase)**
   Configure em `app.config.ts` (ou use variáveis no ambiente):

   ```ts
   extra: {
     SUPABASE_URL: process.env.SUPABASE_URL,
     SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
   }
   ```

   No macOS/Linux:

   ```bash
   export SUPABASE_URL="https://xxxx.supabase.co"
   export SUPABASE_ANON_KEY="ey..."
   ```

3. **Rodar**

   ```bash
   npm run dev
   # abre o Expo, escolha iOS/Android/Web
   ```

## 🧭 Navegação

* `(auth)/login` → Tela de Login
* `(tabs)/home` → Feed/Home
* `(tabs)/eventos` → Lista de eventos (mock)
* `(tabs)/perfil` → Perfil/Logout
* `eventos/[id]` → Detalhe do evento + player (placeholder)

## 🔐 Autenticação

* `AuthProvider` escuta `onAuthStateChange` do Supabase e protege as rotas.
* Usuário **não logado** é redirecionado para **login**.

## 🧪 Mocks

* `src/mocks/events.ts` e `src/mocks/getEventCalendar.ts` para popular a lista de eventos.

## 🧹 Scripts úteis

```json
{
  "scripts": {
    "dev": "expo start -c",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

## 📦 Pacotes úteis (se faltar)

```bash
npm i @supabase/supabase-js expo-constants expo-status-bar expo-av
```

## 🧩 Dicas

* Se aparecer "unmatched route" ou "Hello Router":

  * Verifique a hierarquia de pastas em `app/`
  * Confirme se existe `app/_layout.tsx` e as pastas `(auth)` e `(tabs)`
* SafeArea + StatusBar já incluídos no layout.

---

## 📜 Licença

Privado (uso interno do projeto Cavalo Crioulo).

```
```

---

## 2) `app.config.ts`

> Garante acesso às variáveis e disponibiliza em `Constants.expoConfig?.extra`.

```ts
// app.config.ts
import 'dotenv/config';
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Cavalo Crioulo App',
  slug: 'cavalo-crioulo-app',
  scheme: 'cavalocrioulo',
  extra: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};

export default config;
```

---

## 3) Root Layout — `app/_layout.tsx`

> Provider de autenticação + StatusBar e SafeArea global.

```tsx
// app/_layout.tsx
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from '@/src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Slot />
      </SafeAreaView>
    </AuthProvider>
  );
}
```

> **Nota:** Certifique-se de ter `react-native-safe-area-context` instalado (Expo já inclui).

---

## 4) Layout das Tabs — `app/(tabs)/_layout.tsx`

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="eventos" options={{ title: 'Eventos' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
```

---

## 5) Telas base das Tabs

```tsx
// app/(tabs)/home.tsx
import { View, Text, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Bem-vindo ao Cavalo Crioulo</Text>
      <Text style={{ marginTop: 8 }}>Feed e destaques virão aqui.</Text>
    </ScrollView>
  );
}
```

```tsx
// app/(tabs)/eventos.tsx
import { useRouter } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { events } from '@/src/mocks/events';

export default function EventosScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={events}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 12, borderWidth: 1, borderRadius: 12, marginBottom: 10 }}
            onPress={() => router.push(`/eventos/${item.id}`)}
          >
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
            <Text>{new Date(item.date).toLocaleString()}</Text>
            <Text numberOfLines={2} style={{ opacity: 0.7 }}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
```

```tsx
// app/(tabs)/perfil.tsx
import { View, Text, Button } from 'react-native';
import { useAuth } from '@/src/hooks/useAuth';

export default function PerfilScreen() {
  const { signOut, session } = useAuth();

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Perfil</Text>
      <Text>Usuário: {session?.user?.email ?? '—'}</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}
```

---

## 6) Login — `app/(auth)/login.tsx`

```tsx
// app/(auth)/login.tsx
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      const { error } = await signIn({ email, password });
      if (error) throw error;
      router.replace('/(tabs)/home');
    } catch (e: any) {
      Alert.alert('Erro ao entrar', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 8 }}>Entrar</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
        value={password}
        onChangeText={setPassword}
      />
      <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} />
    </View>
  );
}
```

---

## 7) Detalhe de Evento — `app/eventos/[id].tsx`

```tsx
// app/eventos/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { events } from '@/src/mocks/events';
import { Video } from 'expo-av';

export default function EventoDetalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((e) => String(e.id) === String(id));

  if (!event) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Evento não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{event.title}</Text>
      <Text>{new Date(event.date).toLocaleString()}</Text>
      <Text>{event.description}</Text>

      {/* Placeholder de player: substitua por stream LL-HLS quando integrar */}
      <Video
        style={{ width: '100%', height: 220, backgroundColor: '#000' }}
        source={{ uri: event.videoUrl ?? 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        useNativeControls
        resizeMode="contain"
        shouldPlay={false}
      />
    </View>
  );
}
```

---

## 8) Supabase Client — `src/lib/supabase.ts`

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra as {
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
};

export const supabase = createClient(
  extra?.SUPABASE_URL ?? '',
  extra?.SUPABASE_ANON_KEY ?? ''
);
```

---

## 9) Auth Context — `src/context/AuthContext.tsx`

```tsx
// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';

interface AuthContextProps {
  session: Session | null;
  loading: boolean;
  signIn: (payload: { email: string; password: string }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  // Guarda as rotas: se não logado → (auth), se logado → (tabs)
  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (!loading) {
      if (!session && !inAuthGroup) router.replace('/(auth)/login');
      if (session && inAuthGroup) router.replace('/(tabs)/home');
    }
  }, [loading, session, segments]);

  const value = useMemo(
    () => ({
      session,
      loading,
      signIn: (payload: { email: string; password: string }) => supabase.auth.signInWithPassword(payload),
      signOut: async () => {
        await supabase.auth.signOut();
      },
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be inside AuthProvider');
  return ctx;
}
```

---

## 10) Hook — `src/hooks/useAuth.ts`

```ts
// src/hooks/useAuth.ts
import { useAuthContext } from '@/src/context/AuthContext';
export const useAuth = useAuthContext;
```

---

## 11) Mocks — `src/mocks/events.ts`

```ts
// src/mocks/events.ts
export type EventItem = {
  id: number;
  title: string;
  date: string; // ISO
  description: string;
  videoUrl?: string;
};

export const events: EventItem[] = [
  {
    id: 1,
    title: 'Freio de Ouro — Classificatória Sul',
    date: new Date(Date.now() + 86400000).toISOString(),
    description: 'Etapa classificatória com transmissão ao vivo.',
    videoUrl: undefined,
  },
  {
    id: 2,
    title: 'Leilão Cavalo Crioulo — Haras Exemplo',
    date: new Date(Date.now() + 172800000).toISOString(),
    description: 'Leilão oficial com lotes especiais.',
  },
];
```

````

---

## 12) Mocks — `src/mocks/getEventCalendar.ts`

```ts
// src/mocks/getEventCalendar.ts
import { events } from './events';

export function getEventCalendar() {
  // Exemplo simples de agrupamento por dia
  const map = new Map<string, typeof events>();
  for (const e of events) {
    const day = new Date(e.date).toDateString();
    const list = map.get(day) ?? [];
    list.push(e);
    map.set(day, list);
  }
  return Array.from(map.entries()).map(([day, list]) => ({ day, list }));
}
````

```

---

## 13) Observações finais

- **Hello Router / unmatched route** desaparecem com as pastas e `_layout.tsx` corretos.
- Para player real com **LL‑HLS** (Nimble/Cloudflare/etc.), podemos trocar o `expo-av` por uma **WebView** com player HLS customizado, ou usar libs com suporte a HLS.
- Quando integrar Supabase de fato, criar tabelas `events` e trocar os **mocks** por `from('events').select('*')`.
- Caso use **NativeWind**, mantenha os estilos simples nas telas e evoluímos com design tokens depois.

> Pronto. Com isso você consegue **logar, navegar e visualizar eventos** usando mocks, e já tem o **esqueleto** para plugar streaming e dados reais.

```
