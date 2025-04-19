import { useDraggable } from '@dnd-kit/core';
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
};

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ id, title, type, description, url, author }, ref) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });
    const updateHeight = useCardStore((s) => s.setCardHeight);
    const localRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const node = localRef.current;
      if (!node) return;

      const resizeObserver = new ResizeObserver(() => {
        updateHeight(id, node.offsetHeight);
      });

      resizeObserver.observe(node);
      updateHeight(id, node.offsetHeight);

      return () => {
        resizeObserver.disconnect();
      };
    }, [id, updateHeight]);

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
        className='w-full max-w-cardWidth h-cardHeight bg-cardBackground rounded-cardRounded shadow-postit transition-transform select-text flex flex-col'
        {...listeners}
        {...attributes}
      >
        {/* Header */}
        <div className='px-5 pt-5 select-none border-b border-gray-200'>
          <h3 className='text-[12px] font-semibold text-gray-500 leading-snug mb-1 break-words'>
            {title}
          </h3>
          <div className='h-px bg-gray-200 my-2' />
          <p className='text-[11px] font-medium text-green-700 uppercase tracking-wide mb-2 flex items-center gap-1'>
            <span>{getIconForType(type)}</span>
            {type}
          </p>
        </div>

        {/* Scrollable content */}
        <div className='flex-1 overflow-y-auto px-5 py-3 text-left text-gray-800 text-[12px] leading-snug scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent hover:scrollbar-thumb-green-800'>
          {description && (
            <p className='whitespace-pre-wrap break-words mb-2'>
              {description}
            </p>
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
        </div>

        {/* Footer */}
        <div className='border-t border-gray-200 px-5 py-2 flex items-center justify-between'>
          <p className='text-[11px] text-gray-500 italic'>Autor: {author}</p>
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
