// src/mocks/fixtures.ts

// --- Dados Fake ---
const eventos = [
  {
    id: "1",
    titulo: "Exposição Cavalo Crioulo",
    data: "2025-09-12T18:00:00Z",
    local: "Parque Assis Brasil - Esteio/RS",
    descricao: "Grande evento do Cavalo Crioulo com várias atrações e leilões.",
  },
  {
    id: "2",
    titulo: "Leilão Nacional",
    data: "2025-10-05T20:00:00Z",
    local: "Lagoa Vermelha/RS",
    descricao: "Leilão oficial com transmissão ao vivo.",
  },
];

const transmissoes = [
  {
    id: "t1",
    titulo: "Leilão Virtual Cavalo Crioulo",
    url: "https://example.com/hls/stream.m3u8",
    thumb: "https://placehold.co/600x400?text=Leilao+1",
    ativo: true,
  },
  {
    id: "t2",
    titulo: "Transmissão Expo Inter",
    url: "https://example.com/hls/expo.m3u8",
    thumb: "https://placehold.co/600x400?text=Expo+Inter",
    ativo: false,
  },
];

const noticias = [
  {
    id: "n1",
    titulo: "Nova geração do Cavalo Crioulo",
    resumo: "Animais premiados em Esteio ganham destaque internacional.",
    imagem: "https://placehold.co/600x400?text=Noticia+1",
  },
  {
    id: "n2",
    titulo: "Agenda de eventos 2025",
    resumo: "Confira o calendário completo de exposições e leilões.",
    imagem: "https://placehold.co/600x400?text=Noticia+2",
  },
];

// --- Funções simulando APIs ---
export async function getUpcomingStreams() {
  return transmissoes.filter((t) => t.ativo);
}

export async function getNewsList() {
  return noticias;
}

export async function getHighlights() {
  // exemplo: pega primeiro evento e primeira notícia como destaque
  return {
    evento: eventos[0],
    noticia: noticias[0],
  };
}
