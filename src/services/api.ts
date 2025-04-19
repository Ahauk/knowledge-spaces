const isDev = import.meta.env.DEV;
const API_BASE = isDev ? '/proxy/api' : 'http://54.198.139.161/api';

const API_URLS = {
  cards: `${API_BASE}/cards/`,
  notes: `${API_BASE}/notes/`,
};

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(
      `Error en la petición a ${url}: ${response.status} ${errorDetail}`
    );
  }

  return response.json();
}

export interface CardAPI {
  id: string;
  card_type: string;
  related_cards?: number[];
  content?: {
    title?: string;
    url?: string;
    author?: string;
    description?: string;
  };
}

let cardsCache: CardAPI[] | null = null;

function buildUrl(input: number | string): string {
  if (typeof input === 'number') {
    return `${API_URLS.cards}?page=${input}`;
  }
  if (input.startsWith('/api') || input.startsWith('http')) {
    return input;
  }
  return `${API_URLS.cards}${input}`;
}

export async function getCards(input: number | string = 1): Promise<{
  cards: CardAPI[];
  next: string | null;
}> {
  const url = buildUrl(input);
  const response = await fetchJson(url);

  return {
    cards: response.results ?? [],
    next: response.next ?? null,
  };
}

export async function getCardById(id: string): Promise<CardAPI> {
  const data = await fetchJson(`${API_URLS.cards}${id}/`);
  return data;
}

export async function getAllCards(): Promise<CardAPI[]> {
  if (cardsCache) return cardsCache;

  let page = 1;
  const allResults: CardAPI[] = [];
  let hasMore = true;

  while (hasMore) {
    const response = await fetchJson(`${API_URLS.cards}?page=${page}`);

    if (response?.results) {
      allResults.push(...response.results);
      hasMore = Boolean(response.next);
      page += 1;
    } else {
      hasMore = false;
    }
  }

  cardsCache = allResults;
  return allResults;
}

export function clearCardsCache() {
  cardsCache = null;
}
