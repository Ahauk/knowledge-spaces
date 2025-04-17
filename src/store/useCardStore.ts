import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Position = { x: number; y: number };

type CardStore = {
  positions: Record<string, Position>;
  setPosition: (id: string, pos: Position) => void;
  initializePosition: (id: string, pos: Position) => void;
  resetPositions: () => void;
};

export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      positions: {},
      setPosition: (id, pos) =>
        set((state) => ({
          positions: {
            ...state.positions,
            [id]: pos,
          },
        })),
      initializePosition: (id, pos) =>
        set((state) => {
          if (state.positions[id]) return state;
          return {
            positions: {
              ...state.positions,
              [id]: pos,
            },
          };
        }),
      resetPositions: () => set({ positions: {} }),
    }),
    {
      name: 'card-positions',
    }
  )
);
