import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { ConnectionLayer } from '../components/ConnectionLayer';
import { CardAPI } from '../services/api';
import { useCardStore } from '../store/useCardStore';

const CARDS_PER_ROW = 10;
const CARD_SPACING_Y = 25;
const CARD_OFFSET_X = 300;

export const Canvas = () => {
  const [cards, setCards] = useState<CardAPI[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    '/proxy/api/cards/?page=1'
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showLine, setShowLine] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const positions = useCardStore((state) => state.positions);
  const cardHeights = useCardStore((state) => state.cardHeights);
  const setPosition = useCardStore((state) => state.setPosition);
  const initializePosition = useCardStore((state) => state.initializePosition);
  const resetPositions = useCardStore((state) => state.resetPositions);

  const getCardColor = (index: number) => {
    const colors = [
      'bg-yellow-100',
      'bg-pink-100',
      'bg-green-100',
      'bg-blue-100',
    ];
    return colors[index % colors.length];
  };

  const loadCardsFromUrl = async (url: string | null) => {
    if (!url) return;
    setIsLoadingMore(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setCards((prev) => {
        const newCards = data.results.filter(
          (card: CardAPI) => !prev.some((existing) => existing.id === card.id)
        );
        return [...prev, ...newCards];
      });

      setNextUrl(data.next);
    } catch (error) {
      console.error('Error al cargar tarjetas:', error);
    } finally {
      setIsInitialLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    loadCardsFromUrl(nextUrl);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('canvas-scroll');
    if (!canvas) return;

    const handleScroll = () => {
      const top = canvas.scrollTop;
      setShowLine(top < 10);
    };

    canvas.addEventListener('scroll', handleScroll);
    return () => canvas.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const positionsByColumn: number[] = Array(CARDS_PER_ROW).fill(100);

    cards.forEach((card, index) => {
      const id = String(card.id);
      if (positions[id]) return;

      const col = index % CARDS_PER_ROW;
      const x = CARD_OFFSET_X * col + 60;
      const y = positionsByColumn[col];

      initializePosition(id, { x, y });

      const actualHeight = cardHeights[id] ?? 260;
      positionsByColumn[col] += actualHeight + CARD_SPACING_Y;
    });
  }, [cards, positions, cardHeights, initializePosition]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    const id = String(active.id);
    const current = positions[id];
    if (!current || !delta) return;

    const newX = current.x + delta.x;
    let newY = current.y + delta.y;
    if (newY < 100) newY = 100;
    setPosition(id, { x: newX, y: newY });
  };

  const connections = cards.flatMap((card) =>
    (card.related_cards ?? []).map((relatedId) => ({
      from: String(card.id),
      to: String(relatedId),
    }))
  );

  const canvasHeight =
    Math.max(...Object.values(positions).map((pos) => pos.y), 500) + 400;

  return (
    <div className='min-h-screen w-full bg-black text-white flex flex-col'>
      <header className='relative w-full flex justify-between items-center px-6 py-4 bg-black z-10'>
        <Link
          to='/'
          className='flex items-center gap-2 text-sm text-green-300 hover:text-green transition'
        >
          <ArrowLeft size={16} /> Volver al Home
        </Link>
        <h2 className='text-xl font-semibold tracking-tight text-emerald-400'>
          Canvas
        </h2>
        <button
          onClick={() => {
            resetPositions();
            setAnimationKey((prev) => prev + 1);
          }}
          className='text-sm underline transition'
        >
          Reset Canvas
        </button>
        <div
          className={`absolute bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-green-400 to-transparent ${
            showLine ? 'opacity-50' : 'opacity-0'
          } transition-opacity duration-300 pointer-events-none`}
          style={{ height: '8px' }}
        />
      </header>

      <div
        id='canvas-scroll'
        ref={containerRef}
        className='overflow-scroll flex-1 relative'
      >
        <div
          className='bg-neutral-900 relative'
          style={{
            width: CARD_OFFSET_X * CARDS_PER_ROW + 60,
            height: canvasHeight,
          }}
        >
          <ConnectionLayer
            positions={positions}
            connections={connections}
          />

          <DndContext
            onDragEnd={handleDragEnd}
            key={animationKey}
          >
            {isInitialLoading ? (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-400 border-opacity-50'></div>
              </div>
            ) : (
              <>
                {cards.map((card, index) => {
                  const id = String(card.id);
                  const pos = positions[id] ?? { x: 0, y: 0 };

                  return (
                    <Card
                      key={id}
                      id={id}
                      index={index}
                      title={card.content?.title ?? 'Sin título'}
                      type={card.card_type}
                      description={card.content?.description}
                      url={card.content?.url}
                      author={card.content?.author ?? 'Desconocido'}
                      x={pos.x}
                      y={pos.y}
                      color={getCardColor(index)}
                      ref={(el) => {
                        cardRefs.current[id] = el;
                      }}
                    />
                  );
                })}

                {nextUrl && (
                  <div className='absolute left-1/2 transform -translate-x-1/2 mt-10 bottom-10'>
                    <button
                      onClick={() => loadCardsFromUrl(nextUrl)}
                      disabled={isLoadingMore}
                      className='bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl transition'
                    >
                      {isLoadingMore ? 'Cargando...' : 'Cargar más'}
                    </button>
                  </div>
                )}
              </>
            )}
          </DndContext>
        </div>
      </div>
    </div>
  );
};
