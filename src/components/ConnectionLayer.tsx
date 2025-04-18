import React from 'react';

type Position = {
  x: number;
  y: number;
};

type Connection = {
  from: string;
  to: string;
};

type Props = {
  positions: Record<string, Position>;
  connections: Connection[];
};

export const ConnectionLayer: React.FC<Props> = ({
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
      {connections.map(({ from, to }, index) => {
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
            key={index}
            d={path}
            fill='none'
            stroke='rgba(52, 211, 153, 1)'
            strokeWidth={2}
            strokeLinecap='round'
            strokeDasharray='6 6'
          >
            <animate
              attributeName='stroke-dashoffset'
              from='0'
              to='12'
              dur='1s'
              repeatCount='indefinite'
            />
          </path>
        );
      })}
    </svg>
  );
};
