// Definimos las URLs base a partir del JSON inicial
const API_URLS = {
  cards: '/proxy/api/cards/', // Actualizado para usar un proxy
  notes: '/proxy/api/notes/', // Actualizado para usar un proxy
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

/**
 * Obtiene la lista de tarjetas (cards) con paginación.
 * La respuesta se espera que esté en formato:
 * {
 *    count: number,
 *    next: string | null,
 *    previous: string | null,
 *    results: Card[]
 * }
 */
export async function getCards(
  page?: number
): Promise<{ id: string; title: string; description: string }[]> {
  const data = await fetchJson(`${API_URLS.cards}?page=${page}`);
  // Devuelve el array de resultados (tarjetas)
  return data.cards || [];
}

/**
 * Obtiene una tarjeta en particular, dado su id.
 */
export async function getCardById(id: string) {
  return fetchJson(`${API_URLS.cards}${id}/`);
}

/**
 * Obtiene las tarjetas relacionadas para la tarjeta dada.
 * Espera que la respuesta sea un array de tarjetas.
 */
export const getRelatedCards = async (id: number) => {
  return fetchJson(`${API_URLS.cards}${id}/related_cards/`);
};
