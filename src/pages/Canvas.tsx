import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { ConnectionLayer } from '../components/ConnectionLayer';
import { CardAPI } from '../services/api';
import { useCardStore } from '../store/useCardStore';

const SortableCard = ({
  card,
  index,
  cardRefs,
}: {
  card: CardAPI;
  index: number;
  cardRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: String(card.id),
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? 'transform 200ms ease',
    zIndex: transform ? 50 : 'auto',
    scale: transform ? 1.03 : 1,
  };

  return (
    <div
      ref={(el) => {
        cardRefs.current[String(card.id)] = el;
        setNodeRef(el);
      }}
      style={style}
      {...attributes}
      {...listeners}
      className={`transition-all duration-200 ${
        transform ? 'shadow-lg scale-[1.03]' : ''
      }`}
    >
      <Card
        id={String(card.id)}
        index={index}
        title={card.content?.title ?? 'Sin título'}
        type={card.card_type}
        description={card.content?.description}
        url={card.content?.url}
        author={card.content?.author ?? 'Desconocido'}
      />
    </div>
  );
};

export const Canvas = () => {
  const [cards, setCards] = useState<CardAPI[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    '/proxy/api/cards/?page=1'
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showLine, setShowLine] = useState(true);
  const resetPositions = useCardStore((state) => state.resetPositions);
  const [resetKey, setResetKey] = useState(0);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

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

      const proxiedNext = data.next
        ? data.next.replace('http://54.198.139.161', '/proxy')
        : null;

      setNextUrl(proxiedNext);
    } catch (error) {
      console.error('Error al cargar tarjetas:', error);
    } finally {
      setIsLoadingMore(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    loadCardsFromUrl(nextUrl);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleScroll = () => {
      const top = canvas.scrollTop;
      setShowLine(top < 10);
    };

    canvas.addEventListener('scroll', handleScroll);
    return () => canvas.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current || !nextUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadCardsFromUrl(nextUrl);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [nextUrl]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = cards.findIndex((c) => String(c.id) === active.id);
    const newIndex = cards.findIndex((c) => String(c.id) === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(cards, oldIndex, newIndex);
    setCards(reordered);
  };

  const connections = cards.flatMap((card) =>
    (card.related_cards ?? []).map((relatedId) => ({
      from: String(card.id),
      to: String(relatedId),
    }))
  );

  return (
    <div className='min-h-screen w-full bg-white text-gray-900 flex flex-col relative'>
      <header className='sticky top-0 w-full flex justify-between items-center px-6 py-4 bg-white z-10 shadow-sm border-b border-gray-200'>
        <Link
          to='/'
          className='flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition'
        >
          <ArrowLeft size={16} /> Volver al Home
        </Link>
        <h2 className='text-xl font-semibold tracking-tight text-gray-500'>
          Canvas
        </h2>
        <button
          onClick={() => {
            resetPositions();
            setCards([]);
            setNextUrl('/proxy/api/cards/?page=1');
            setResetKey((k) => k + 1);
          }}
          className='text-sm underline text-green-600 hover:text-green-700 transition'
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

      <main
        className='flex-1 px-6 py-8 bg-[#fdfdfb] relative overflow-y-auto'
        id='canvas-scroll'
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {isInitialLoading ? (
            <div className='flex justify-center items-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-opacity-50'></div>
            </div>
          ) : (
            <SortableContext
              key={resetKey}
              items={cards.map((c) => String(c.id))}
              strategy={rectSortingStrategy}
            >
              <ConnectionLayer
                cardRefs={cardRefs.current}
                connections={connections}
              />
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-6 px-canvas-x'>
                {cards.map((card, index) => (
                  <SortableCard
                    key={String(card.id)}
                    card={card}
                    index={index}
                    cardRefs={cardRefs}
                  />
                ))}
              </div>
              {isLoadingMore && (
                <div className='flex justify-center items-center mt-6'>
                  <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-green-500 border-opacity-50'></div>
                </div>
              )}
              <div
                ref={loadMoreRef}
                className='h-1'
              />
            </SortableContext>
          )}
        </DndContext>
      </main>
    </div>
  );
};
