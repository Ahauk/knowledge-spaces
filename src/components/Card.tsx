import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { forwardRef, useEffect, useRef } from 'react';
import { useCardStore } from '../store/useCardStore';

type Props = {
  id: string;
  index: number;
  title: string;
  type: string;
  description?: string;
  url?: string;
  author: string;
  x: number;
  y: number;
  color?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const Card = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      title,
      type,
      description,
      url,
      author,
      x,
      y,
      color = 'bg-yellow-100',
      onEdit,
      onDelete,
    },
    ref
  ) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
    });
    const updateHeight = useCardStore((s) => s.setCardHeight);
    const localRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const node = localRef.current;
      if (!node) return;

      const resizeObserver = new ResizeObserver(() => {
        updateHeight(id, node.offsetHeight);
      });

      resizeObserver.observe(node);
      updateHeight(id, node.offsetHeight); // Primer valor inicial

      return () => {
        resizeObserver.disconnect();
      };
    }, [id, updateHeight]);

    const style = {
      transform: CSS.Translate.toString(
        transform ?? { x: 0, y: 0, scaleX: 1, scaleY: 1 }
      ),
      top: y,
      left: x,
    };

    return (
      <motion.div
        ref={(node) => {
          setNodeRef(node);
          localRef.current = node;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref && typeof ref === 'object') {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
          }
        }}
        style={style}
        className={`absolute ${color} rounded-xl shadow-lg w-64 transition-transform hover:scale-[1.01] select-text`}
      >
        {/* Header */}
        <div
          {...listeners}
          {...attributes}
          className='cursor-grab px-4 py-2 border-b border-black/10 bg-black/5 rounded-t-xl select-none'
        >
          <h3 className='text-base font-semibold text-gray-900 leading-tight break-words'>
            {title}
          </h3>
          <p className='text-[11px] font-medium text-green-700 uppercase tracking-wider flex items-center gap-1'>
            <span>{getIconForType(type)}</span>
            {type}
          </p>
        </div>

        {/* Content */}
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
                onClick={() => onEdit?.(id)}
                className='p-1 rounded-full bg-white/80 hover:bg-white shadow transition'
              >
                <Pencil
                  size={14}
                  className='text-gray-700'
                />
              </button>
              <button
                onClick={() => onDelete?.(id)}
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
      </motion.div>
    );
  }
);

function getIconForType(type: string): string {
  const icons: Record<string, string> = {
    note: '📝',
    article: '📄',
    link: '🔗',
    idea: '💡',
  };
  return icons[type] || '📌';
}
