import { Card, mockCards, mockRelatedCards } from './mock';

/* const API_URLS = {
  cards: '/proxy/api/cards/',
  notes: '/proxy/api/notes/',
}; */

/**
 * Realiza una petición GET y retorna el JSON, o lanza un error si la respuesta no es exitosa.
 */

/* async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('URL', url);
  console.log('Response status', response.status);
  console.log('Raw response', await response.clone().text());

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(
      `Error en la petición a ${url}: ${response.status} ${errorDetail}`
    );
  }
  return response.json();
} */

/* export async function getCards(page?: number): Promise<
  {
    id: string;
    content?: {
      title?: string;
      url?: string;
      author?: string;
      description?: string;
    };
    card_type: string;
  }[]
> {
  const data = await fetchJson(`${API_URLS.cards}?page=${page}`);
  return data.results ?? [];
} */

// Mock functions mientras se reestab

export async function getCards(): Promise<Card[]> {
  return mockCards;
}

export async function getRelatedCards(cardId: number): Promise<Card[]> {
  return mockRelatedCards[cardId] || [];
}

/* export async function getCardById(id: string): Promise<{
  id: string;
  content?: {
    title?: string;
    url?: string;
    author?: string;
    description?: string;
  };
  card_type: string;
}> {
  const data = await fetchJson(`${API_URLS.cards}${id}/`);
  return data;
} */
