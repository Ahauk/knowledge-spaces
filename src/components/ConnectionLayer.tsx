import React from 'react';

export type Position = {
  x: number;
  y: number;
};

export type ConnectionLayerProps = {
  positions: Record<string, Position>;
  connections: { from: string; to: string }[];
};

export const ConnectionLayer: React.FC<ConnectionLayerProps> = ({
  positions,
  connections,
}) => {
  return (
    <svg
      width='4000'
      height='4000'
      viewBox='0 0 4000 4000'
      className='absolute top-0 left-0 pointer-events-none -z-10'
    >
      {connections.map(({ from, to }) => {
        const start = positions[from];
        const end = positions[to];

        if (!start || !end) return null;

        const startX = start.x + 128;
        const startY = start.y + 40;
        const endX = end.x + 128;
        const endY = end.y + 40;
        const controlX = (startX + endX) / 2;

        const path = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;

        return (
          <path
            key={`${from}-${to}-${startX}-${startY}-${endX}-${endY}`}
            d={path}
            fill='none'
            stroke='rgba(52, 211, 153, 1)'
            strokeWidth={2}
            strokeLinecap='round'
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              animation: 'drawLine 1s ease forwards',
            }}
          />
        );
      })}

      <style>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
};
