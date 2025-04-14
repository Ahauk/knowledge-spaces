import { Layer, Line, Rect, Stage } from 'react-konva';
import { useCanvasStore } from '../hooks/useCanvasStore';

export const Canvas = () => {
  const { items, connections } = useCanvasStore();

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {items.map((item) => (
          <Rect
            key={item.id}
            x={item.x}
            y={item.y}
            width={150}
            height={100}
            fill='lightblue'
            draggable
          />
        ))}
        {connections.map((conn) => (
          <Line
            key={conn.id}
            points={[conn.fromX, conn.fromY, conn.toX, conn.toY]}
            stroke='black'
            strokeWidth={2}
          />
        ))}
      </Layer>
    </Stage>
  );
};
