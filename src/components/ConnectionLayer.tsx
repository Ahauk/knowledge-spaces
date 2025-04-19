import React, { useEffect, useRef, useState } from 'react';

type Props = {
  cardRefs: Record<string, HTMLDivElement | null>;
  connections: { from: string; to: string }[];
};

export const ConnectionLayer: React.FC<Props> = ({ cardRefs, connections }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const parent = svgRef.current.parentElement;
      if (parent) {
        setCanvasRect(parent.getBoundingClientRect());
      }
    }
  }, [cardRefs]);

  return (
    <svg
      ref={svgRef}
      className='absolute inset-0 pointer-events-none w-full h-full'
    >
      {canvasRect &&
        connections.map(({ from, to }) => {
          const fromEl = cardRefs[from];
          const toEl = cardRefs[to];
          if (!fromEl || !toEl) return null;

          const fromRect = fromEl.getBoundingClientRect();
          const toRect = toEl.getBoundingClientRect();

          const x1 = fromRect.left + fromRect.width / 2 - canvasRect.left;
          const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top;
          const x2 = toRect.left + toRect.width / 2 - canvasRect.left;
          const y2 = toRect.top + toRect.height / 2 - canvasRect.top;

          return (
            <line
              key={`${from}-${to}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke='rgba(0,0,0,0.12)'
              strokeWidth='2'
              strokeLinecap='round'
            />
          );
        })}
    </svg>
  );
};
