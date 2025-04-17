import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { useCardStore } from '../store/useCardStore';

type Props = {
  id: string;
  title: string;
  type: string;
  description?: string;
  url?: string;
  author: string;
  x: number;
  y: number;
  color?: string;
  index: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export const Card = ({
  id,
  title,
  type,
  description,
  url,
  author,
  x,
  y,
  color = 'bg-yellow-100',
  index,
  onEdit,
  onDelete,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const pos = useCardStore((state) => state.positions[id]) ?? { x, y };

  const dragStyle = {
    transform: CSS.Translate.toString(
      transform ?? { x: 0, y: 0, scaleX: 1, scaleY: 1 }
    ),
    top: pos.y,
    left: pos.x,
  };

  const getIconForType = (type: string) => {
    const icons: Record<string, string> = {
      note: '📝',
      article: '📄',
      link: '🔗',
      idea: '💡',
    };
    return icons[type] || '📌';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 18,
        duration: 0.4,
        delay: index * 0.05,
      }}
    >
      <div
        ref={setNodeRef}
        style={dragStyle}
        {...attributes}
        {...listeners}
        className={`absolute ${color} rounded-xl shadow-lg w-64 transition-transform hover:scale-[1.01] select-text`}
      >
        <div className='px-4 py-2 border-b border-black/10 bg-black/5 rounded-t-xl select-none'>
          <h3 className='text-base font-semibold text-gray-900 leading-tight break-words'>
            {title}
          </h3>
          <p className='text-[11px] font-medium text-green-700 uppercase tracking-wider flex items-center gap-1'>
            <span>{getIconForType(type)}</span>
            {type}
          </p>
        </div>

        <div className='px-4 py-3 flex flex-col gap-2 text-left'>
          {description && (
            <p className='text-sm text-gray-700 whitespace-pre-wrap break-words'>
              {description}
            </p>
          )}

          {url && (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-xs text-blue-700 underline break-all flex items-center gap-1'
            >
              <span>🔗</span>
              {url}
            </a>
          )}

          <div className='border-t pt-2 mt-2 flex items-center justify-between'>
            <p className='text-xs text-gray-500 italic'>Autor: {author}</p>
            <div className='flex gap-1'>
              <button
                onClick={() => onEdit?.(parseInt(id))}
                className='p-1 rounded-full bg-white/80 hover:bg-white shadow transition'
              >
                <Pencil
                  size={14}
                  className='text-gray-700'
                />
              </button>
              <button
                onClick={() => onDelete?.(parseInt(id))}
                className='p-1 rounded-full bg-white/80 hover:bg-white shadow transition'
              >
                <Trash2
                  size={14}
                  className='text-red-600'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
