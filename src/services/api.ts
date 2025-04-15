const API_URLS = {
  cards: '/proxy/api/cards/',
  notes: '/proxy/api/notes/',
};

/**
 * Realiza una petición GET y retorna el JSON, o lanza un error si la respuesta no es exitosa.
 */

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

export async function getCards(page?: number): Promise<
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
  // Devuelve el array de resultados (tarjetas)
  return data.results ?? [];
}

export async function getCardById(id: string): Promise<{
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
}
