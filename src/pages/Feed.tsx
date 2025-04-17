import { useEffect, useState } from 'react';
import { Card as CardComponent } from '../components/Card';
import { getCards, getRelatedCards } from '../services/api';
import { Card } from '../services/mock';

const CARDS_PER_PAGE = 3;

export const Feed = () => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [visibleCards, setVisibleCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [relatedCards, setRelatedCards] = useState<Card[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getCards();
      setAllCards(data);
      setVisibleCards(data.slice(0, CARDS_PER_PAGE));
    };
    fetchCards();
  }, []);

  const handleCardClick = async (card: Card) => {
    setSelectedCard(card);
    const related = await getRelatedCards(card.id);
    setRelatedCards(related);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const nextSlice = allCards.slice(0, nextPage * CARDS_PER_PAGE);
    setVisibleCards(nextSlice);
    setPage(nextPage);
  };

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
            {visibleCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className='cursor-pointer transition-transform hover:scale-[1.02] w-full text-left p-0 bg-transparent border-none'
                aria-label={`Ver detalles de ${card.content.title}`}
              >
                <CardComponent
                  id={card.id}
                  title={card.content.title}
                  type={card.card_type}
                  description={card.content.description}
                  url={card.content.url}
                  author={card.content.author}
                  x={0}
                  y={0}
                  color='bg-pink-100'
                />
              </button>
            ))}
          </div>

          {visibleCards.length < allCards.length && (
            <div className='flex justify-center mt-6'>
              <button
                onClick={loadMore}
                className='bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl transition'
              >
                Cargar más
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
              title={selectedCard.content.title}
              type={selectedCard.card_type}
              description={selectedCard.content.description}
              url={selectedCard.content.url}
              author={selectedCard.content.author}
              x={0}
              y={0}
              color='bg-yellow-100'
            />
          </div>

          <div>
            <h3 className='text-lg font-medium mb-2'>Relacionadas</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {relatedCards.map((card) => (
                <CardComponent
                  key={card.id}
                  id={card.id}
                  title={card.content.title}
                  type={card.card_type}
                  description={card.content.description}
                  url={card.content.url}
                  author={card.content.author}
                  x={0}
                  y={0}
                  color='bg-blue-100'
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
