import { DndContext, DragEndEvent } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';
import NodeItem, { NodeType } from '../components/NodeItem';
import { getCards } from '../services/api';
import '../styles/KnowledgeSpace.css';

const KnowledgeSpace: React.FC = () => {
  const [nodes, setNodes] = useState<NodeType[]>([]);

  // Al cargar, obtenemos las tarjetas y les asignamos posiciones aleatorias iniciales.
  useEffect(() => {
    getCards().then((cards: any[]) => {
      const initialNodes: NodeType[] = cards.map((card, index) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        // Posición aleatoria; para una solución real podrías implementar un layout "smart"
        x: Math.random() * 800,
        y: Math.random() * 600,
      }));
      setNodes(initialNodes);
    });
  }, []);

  // Maneja el final del drag & drop para actualizar la posición del nodo.
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === active.id) {
          return {
            ...node,
            // Se acumula el desplazamiento; en una implementación real podrías querer
            // usar transformaciones acumulativas o calcular coordenadas absolutas.
            x: node.x + delta.x,
            y: node.y + delta.y,
          };
        }
        return node;
      })
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='canvas-container'>
        {nodes.map((node) => (
          <NodeItem
            key={node.id}
            node={node}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KnowledgeSpace;
