import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { getCards } from '../services/api';
import { Card as CardType } from '../services/mock';
import { useCardStore } from '../store/useCardStore';

export const Canvas = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [showLine, setShowLine] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  const positions = useCardStore((state) => state.positions);
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

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
      } catch (error) {
        console.error('Error al obtener tarjetas:', error);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('canvas-scroll');
    const handleScroll = () => {
      if (!canvas) return;
      const top = canvas.scrollTop;
      setShowLine(top < 10);
    };
    canvas?.addEventListener('scroll', handleScroll);
    return () => canvas?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    cards.forEach((card, index) => {
      const id = String(card.id);
      const defaultPos = {
        x: 400 * (index % 4) + 60,
        y: 300 * Math.floor(index / 4) + 60,
      };
      initializePosition(id, defaultPos);
    });
  }, [cards, initializePosition]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    const id = String(active.id);
    const current = positions[id];

    if (current && delta) {
      const newX = current.x + delta.x;
      let newY = current.y + delta.y;

      const MIN_Y = 100;
      if (newY < MIN_Y) newY = MIN_Y;

      setPosition(id, { x: newX, y: newY });
    }
  };

  return (
    <div className='min-h-screen w-full bg-black text-white flex flex-col'>
      <header className='relative w-full flex justify-between items-center px-6 py-4 bg-black z-10'>
        <Link
          to='/'
          className='flex items-center gap-2 text-sm text-gray-300 hover:text-white transition'
          style={{ color: '#fff' }}
        >
          <ArrowLeft size={16} /> Volver al Home
        </Link>
        <div className='flex items-center gap-4'>
          <h2
            className='text-xl font-semibold tracking-tight'
            style={{ color: '#34d399' }}
          >
            Canvas
          </h2>
        </div>
        <button
          onClick={() => {
            resetPositions();
            cards.forEach((card, index) => {
              const id = String(card.id);
              const defaultPos = {
                x: 400 * (index % 4) + 60,
                y: 300 * Math.floor(index / 4) + 60,
              };
              initializePosition(id, defaultPos);
            });
            setAnimationKey((prev) => prev + 1);
          }}
          className='text-sm text-white-400 hover:text-white-200 underline transition'
        >
          Reset Canvas
        </button>
        <div
          className={`absolute bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-green-400 to-transparent transition-opacity duration-300 pointer-events-none ${
            showLine ? 'opacity-50' : 'opacity-0'
          }`}
          style={{ height: '8px' }}
          id='header-line'
        />
      </header>

      <div
        id='canvas-scroll'
        className='overflow-scroll flex-1 relative'
        style={{ transform: 'none' }}
      >
        <div className='w-[4000px] h-[4000px] bg-neutral-900 relative'>
          <DndContext
            onDragEnd={handleDragEnd}
            key={animationKey}
          >
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
                />
              );
            })}
          </DndContext>
        </div>
      </div>
    </div>
  );
};
