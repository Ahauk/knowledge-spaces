import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
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
};

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ id, title, type, description, url, author, x, y }, ref) => {
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
            ref.current = node;
          }
        }}
        style={style}
        className={`absolute bg-cardBackground rounded-cardRounded shadow-postit w-64 transition-transform select-text`}
      >
        {/* Header */}
        <div
          {...listeners}
          {...attributes}
          className='cursor-grab px-5 pt-5 select-none rounded-t-[32px]'
        >
          <h3 className='text-[14px] font-semibold text-gray-500 leading-snug break-words'>
            {title}
          </h3>
          <div className='h-px bg-gray-200 my-2' />
          <p className='text-[11px] font-medium text-green-700 uppercase tracking-wider flex items-center gap-1'>
            <span>{getIconForType(type)}</span>
            {type}
          </p>
        </div>

        {/* Content */}
        <div className='px-5 py-4 flex flex-col gap-3 text-left text-gray-800 text-[13px] leading-snug'>
          {description && (
            <p className='whitespace-pre-wrap break-words'>{description}</p>
          )}

          {url && (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-[12px] text-blue-700 underline break-all flex items-center gap-1'
            >
              <span>🔗</span>
              {url}
            </a>
          )}

          <div className='border-t border-gray-200 pt-2 mt-2 flex items-center justify-between'>
            <p className='text-[11px] text-gray-500 italic'>Autor: {author}</p>
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
