import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Position = { x: number; y: number };

type CardStore = {
  positions: Record<string, Position>;
  cardHeights: Record<string, number>;
  setPosition: (id: string, pos: Position) => void;
  initializePosition: (id: string, pos: Position) => void;
  setCardHeight: (id: string, height: number) => void;
  resetPositions: () => void;
};

export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      positions: {},
      cardHeights: {},
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
      setCardHeight: (id, height) =>
        set((state) => ({
          cardHeights: {
            ...state.cardHeights,
            [id]: height,
          },
        })),
      resetPositions: () =>
        set({
          positions: {},
          cardHeights: {},
        }),
      clearHeights: () => set({ cardHeights: {} }),
    }),
    {
      name: 'card-positions',
    }
  )
);
