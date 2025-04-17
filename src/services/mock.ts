export interface Card {
  id: number;
  card_type: string;
  content: {
    title: string;
    description: string;
    author: string;
    url?: string;
  };
}

export const mockCards = [
  {
    id: 101,
    card_type: 'article',
    content: {
      title: 'Cómo optimizar tu frontend',
      description:
        'Exploramos estrategias avanzadas de rendimiento y renderizado para interfaces modernas.',
      author: 'Elena Navarro',
      url: 'https://frontendtips.dev/optimizar',
    },
  },
  {
    id: 102,
    card_type: 'note',
    content: {
      title: 'Ideas para rediseño del Canvas',
      description:
        '→ Menos bordes\n→ Espaciado generoso\n→ Animaciones sutiles',
      author: 'Víctor S.',
    },
  },
  {
    id: 103,
    card_type: 'link',
    content: {
      title: 'Repositorio oficial',
      description: '',
      author: 'Equipo Sublime',
      url: 'https://github.com/sublime/knowledge-ui',
    },
  },
  {
    id: 104,
    card_type: 'idea',
    content: {
      title: '¿Y si conectamos tarjetas con AI?',
      description:
        'Detectar relaciones semánticas y visualizarlas automáticamente. ¡Boom!',
      author: 'Samurai Dev',
    },
  },
  {
    id: 105,
    card_type: 'note',
    content: {
      title: 'Checklist para lanzar MVP',
      description:
        '✅ Diseño validado\n✅ Componentes limpios\n✅ Feedback temprano',
      author: 'Marcela Ruiz',
    },
  },
  {
    id: 106,
    card_type: 'article',
    content: {
      title: 'Design Systems para humanos',
      description:
        'Diseñamos no solo para el código, sino para los equipos. Aquí cómo lo logramos.',
      author: 'Ariel López',
      url: 'https://medium.com/ds-humanos',
    },
  },
  {
    id: 107,
    card_type: 'idea',
    content: {
      title: 'Canvas colaborativo en tiempo real',
      description:
        '¿Podríamos sincronizar arrastres con WebSockets y mantener estado compartido?',
      author: 'Héctor Bravo',
    },
  },
  {
    id: 108,
    card_type: 'note',
    content: {
      title: 'Notas sueltas',
      description:
        'Esto podría ser una nota rápida para no olvidar algo importante.',
      author: 'Yo mismo',
    },
  },
  {
    id: 109,
    card_type: 'article',
    content: {
      title: 'Microinteracciones en UIs',
      description:
        'Qué son, cómo aplicarlas, y por qué pueden hacer o romper tu interfaz.',
      author: 'Estudio Motion',
      url: 'https://uimicro.com/articulo',
    },
  },
  {
    id: 110,
    card_type: 'link',
    content: {
      title: 'Documentación oficial de Vite',
      description: '',
      author: 'ViteJS',
      url: 'https://vitejs.dev/',
    },
  },
  {
    id: 111,
    card_type: 'note',
    content: {
      title: '⚠️ No olvidar',
      description: 'Añadir paginación real al backend cuando esté disponible',
      author: 'Dev team',
    },
  },
  {
    id: 112,
    card_type: 'idea',
    content: {
      title: 'Inspiración tipo Miro',
      description: 'Agregar snapping, zoom inteligente y agrupación automática',
      author: 'Víctor',
    },
  },
];

export const mockRelatedCards: Record<number, Card[]> = {
  101: [
    {
      id: 201,
      card_type: 'article',
      content: {
        title: 'Renderizado en React 19',
        description:
          'Analizamos las mejoras clave en la nueva versión y cómo implementarlas.',
        author: 'Laura G.',
        url: 'https://react.dev/render19',
      },
    },
    {
      id: 202,
      card_type: 'note',
      content: {
        title: 'Notas de performance',
        description:
          '→ Lazy load\n→ Suspense boundaries\n→ Virtual DOM batching',
        author: 'Elena Navarro',
      },
    },
  ],
  102: [
    {
      id: 203,
      card_type: 'idea',
      content: {
        title: 'Tarjetas inteligentes',
        description:
          '¿Y si el canvas agrupa automáticamente por categoría o autor?',
        author: 'Víctor',
      },
    },
  ],
};
