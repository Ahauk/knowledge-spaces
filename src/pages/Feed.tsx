import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card as CardComponent } from '../components/Card';
import { generateAISummary } from '../services/ai';
import { CardAPI, getCardById } from '../services/api';

export const Feed = () => {
  const [cards, setCards] = useState<CardAPI[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardAPI | null>(null);
  const [relatedCards, setRelatedCards] = useState<CardAPI[]>([]);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(
    '/proxy/api/cards/?page=1'
  );
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

    const textToSummarize =
      card.content?.description ?? card.content?.title ?? '';

    if (textToSummarize) {
      const summary = await generateAISummary(textToSummarize);
      setAiSummary(summary);
    } else {
      setAiSummary(null);
    }
  };

  const loadMore = async () => {
    if (!nextUrl) return;
    setIsLoading(true);
    try {
      const response = await fetch(nextUrl);
      const data = await response.json();

      const newCards = data.results.filter(
        (card: CardAPI) => !cards.some((existing) => existing.id === card.id)
      );

      setCards((prev) => [...prev, ...newCards]);

      const proxiedNext = data.next
        ? data.next.replace('http://54.198.139.161', '/proxy')
        : null;

      setNextUrl(proxiedNext);
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
    setAiSummary(null);
  };

  return (
    <div className='min-h-screen w-full bg-[#fdfdfb] text-gray-900 flex flex-col'>
      <header className='sticky top-0 w-full flex justify-between items-center px-6 py-4 bg-white z-10 shadow-sm border-b border-gray-200'>
        <Link
          to='/'
          className='flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition'
        >
          <span className='text-green-600'>&larr;</span> Volver al Home
        </Link>
        <h2 className='text-xl font-semibold tracking-tight text-gray-500'>
          Feed
        </h2>
        <div className='w-8' />
        <div
          className={`absolute bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50 transition-opacity duration-300 pointer-events-none`}
          style={{ height: '8px' }}
        />
      </header>

      <main className='flex-1 px-6 py-8'>
        {!selectedCard ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-6'>
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className='cursor-pointer transition-transform hover:scale-[1.03] w-full text-left p-0 bg-transparent border-none'
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
                    index={0}
                  />
                </button>
              ))}
            </div>

            {nextUrl && (
              <div className='flex justify-center mt-6'>
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className='bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition'
                >
                  {isLoading ? 'Cargando...' : 'Cargar más'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className='flex flex-col gap-6'>
            <div className='mb-4 flex'>
              <button
                onClick={handleBack}
                className='bg-green-700 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition'
              >
                ← Volver al Feed
              </button>
            </div>

            <div className='flex flex-col items-start max-w-4xl'>
              <div className='flex flex-col gap-2 mb-4'>
                <div className='relative w-fit pb-1'>
                  <h2 className='text-xl font-semibold text-green-800 z-10 relative'>
                    Tarjeta principal
                  </h2>
                  <div
                    className='absolute left-0 bottom-0 h-[2px] w-full'
                    style={{
                      background:
                        'linear-gradient(to right, rgba(16,185,129,0.7), transparent)',
                    }}
                  />
                </div>

                {aiSummary && (
                  <div className='bg-green-50 border border-green-100 px-4 py-3 rounded-lg max-w-2xl shadow-sm flex flex-col gap-2'>
                    <h4 className='text-sm font-semibold text-green-800'>
                      Resumen generado por IA
                    </h4>
                    <p className='text-sm text-gray-700 italic'>{aiSummary}</p>
                  </div>
                )}
              </div>

              <CardComponent
                id={selectedCard.id}
                title={selectedCard.content?.title ?? 'Sin título'}
                type={selectedCard.card_type}
                description={selectedCard.content?.description}
                url={selectedCard.content?.url}
                author={selectedCard.content?.author ?? 'Desconocido'}
                index={0}
              />
            </div>

            <div className='mt-6'>
              {relatedCards.length > 0 ? (
                <>
                  <div className='relative w-fit mb-4 pb-1'>
                    <h3 className='text-lg font-semibold text-green-800 z-10 relative'>
                      Relacionadas
                    </h3>
                    <div
                      className='absolute left-0 bottom-0 h-[2px] w-full'
                      style={{
                        background:
                          'linear-gradient(to right, rgba(16,185,129,0.7), transparent)',
                      }}
                    />
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-6'>
                    {relatedCards.map((card) => (
                      <CardComponent
                        key={card.id}
                        id={card.id}
                        title={card.content?.title ?? 'Sin título'}
                        type={card.card_type}
                        description={card.content?.description}
                        url={card.content?.url}
                        author={card.content?.author ?? 'Desconocido'}
                        index={0}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className='text-gray-300 italic flex justify-center text-xl'>
                  No hay tarjetas relacionadas.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
