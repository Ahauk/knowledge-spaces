import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import '../styles/NodeItem.css';

export type NodeType = {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
};

type Props = {
  node: NodeType;
};

const NodeItem: React.FC<Props> = ({ node }) => {
  // Con useDraggable, cada nodo será identificable por su ID
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: node.id,
  });

  // El hook nos proporciona "transform" con la diferencia de movimiento.
  // Aquí lo usamos para transformar la posición inicial del nodo.
  const style: React.CSSProperties = {
    position: 'absolute',
    left: node.x,
    top: node.y,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className='node-item'
      style={style}
    >
      <h4>{node.title}</h4>
      <p>{node.description.slice(0, 50)}...</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          alert(`Sugerencias para: ${node.title}`);
        }}
      >
        Sugerir Conexiones
      </button>
    </div>
  );
};

export default NodeItem;
