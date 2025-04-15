import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { getCards } from '../services/api';
import { useCardStore } from '../store/useCardStore';

type CardType = {
  id: string;
  content?: {
    title?: string;
    url?: string;
    author?: string;
    description?: string;
  };
  card_type: string;
};

export const Canvas = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [showLine, setShowLine] = useState(true);
  const { positions, setPosition } = useCardStore();

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
        const data = await getCards(1); // Página 1 por ahora
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    const current = positions[active.id];

    if (current) {
      setPosition(active.id as string, {
        x: current.x + delta.x,
        y: current.y + delta.y,
      });
    }
  };

  return (
    <motion.div
      className='min-h-screen w-full bg-black text-white flex flex-col'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Bar */}
      <header className='relative w-full flex justify-between items-center px-6 py-4 bg-black z-10'>
        <h2 className='text-xl font-semibold tracking-tight'>Canvas</h2>
        <Link
          to='/'
          className='flex items-center gap-2 text-sm text-gray-300 hover:text-white transition'
          style={{ color: '#34d399' }}
        >
          <ArrowLeft size={16} /> Volver al Home
        </Link>

        {/* Línea difuminada debajo */}
        <div
          className={`absolute bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-green-400 to-transparent transition-opacity duration-300 pointer-events-none ${
            showLine ? 'opacity-50' : 'opacity-0'
          }`}
          style={{ height: '8px' }}
          id='header-line'
        />
      </header>

      {/* Canvas Area */}
      <div
        id='canvas-scroll'
        className='overflow-scroll flex-1 relative'
      >
        <div className='w-[4000px] h-[4000px] bg-neutral-900 relative'>
          <DndContext onDragEnd={handleDragEnd}>
            {cards.map((card, index) => {
              const pos = positions[card.id] ?? {
                x: 150 + index * 250,
                y: 150 + (index % 3) * 200,
              };

              return (
                <Card
                  key={card.id}
                  id={parseInt(card.id)}
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
          {/*  <pre className='text-green-300 text-xs'>
              {JSON.stringify(cards, null, 2)}
            </pre> */}
        </div>
      </div>
    </motion.div>
  );
};
