import { useEffect, useState } from 'react';
import { Card as CardComponent } from '../components/Card';
import { CardAPI, getCardById, getCards } from '../services/api';

export const Feed = () => {
  const [cards, setCards] = useState<CardAPI[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardAPI | null>(null);
  const [relatedCards, setRelatedCards] = useState<CardAPI[]>([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRelatedCards = async (ids: number[]) => {
    try {
      const related = await Promise.all(
        ids.map((id) => getCardById(String(id)))
      );
      setRelatedCards(related);
    } catch (error) {
      console.error('Error al obtener tarjetas relacionadas:', error);
    }
  };

  const handleCardClick = async (card: CardAPI) => {
    setSelectedCard(card);
    const related = card.related_cards ?? [];
    await fetchRelatedCards(related);
  };

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const { cards: newCards, next } = await getCards(page);
      setCards((prev) => [...prev, ...newCards]);
      setPage((prev) => prev + 1);
      setNext(next);
    } catch (error) {
      console.error('Error al cargar tarjetas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const handleBack = () => {
    setSelectedCard(null);
    setRelatedCards([]);
  };

  return (
    <div className='min-h-screen w-full bg-black text-white p-6'>
      <h1 className='text-2xl font-bold mb-6'>Feed</h1>

      {!selectedCard ? (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className='cursor-pointer transition-transform hover:scale-[1.02] w-full text-left p-0 bg-transparent border-none'
                aria-label={`Ver detalles de ${
                  card.content?.title ?? 'Sin título'
                }`}
              >
                <CardComponent
                  id={card.id}
                  title={card.content?.title ?? 'Sin título'}
                  type={card.card_type}
                  description={card.content?.description}
                  url={card.content?.url}
                  author={card.content?.author ?? 'Desconocido'}
                  x={0}
                  y={0}
                  color='bg-pink-100'
                  index={0}
                />
              </button>
            ))}
          </div>

          {next && (
            <div className='flex justify-center mt-6'>
              <button
                onClick={loadMore}
                disabled={isLoading}
                className='bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl transition'
              >
                {isLoading ? 'Cargando...' : 'Cargar más'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='flex flex-col gap-6'>
          <div className='mb-4'>
            <button
              onClick={handleBack}
              className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition'
            >
              ← Volver al Feed
            </button>
          </div>

          <div>
            <h2 className='text-xl font-semibold mb-2'>Tarjeta principal</h2>
            <CardComponent
              id={selectedCard.id}
              title={selectedCard.content?.title ?? 'Sin título'}
              type={selectedCard.card_type}
              description={selectedCard.content?.description}
              url={selectedCard.content?.url}
              author={selectedCard.content?.author ?? 'Desconocido'}
              x={0}
              y={0}
              color='bg-yellow-100'
              index={0}
            />
          </div>

          <div>
            <h3 className='text-lg font-medium mb-2'>Relacionadas</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {relatedCards.map((card) => (
                <CardComponent
                  key={card.id}
                  id={card.id}
                  title={card.content?.title ?? 'Sin título'}
                  type={card.card_type}
                  description={card.content?.description}
                  url={card.content?.url}
                  author={card.content?.author ?? 'Desconocido'}
                  x={0}
                  y={0}
                  color='bg-blue-100'
                  index={0}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
