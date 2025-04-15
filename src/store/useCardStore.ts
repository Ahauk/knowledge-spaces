import { create } from 'zustand';

type Position = { x: number; y: number };

type CardStore = {
  positions: Record<string, Position>;
  setPosition: (id: string, position: Position) => void;
};

export const useCardStore = create<CardStore>((set) => ({
  positions: {},
  setPosition: (id, position) =>
    set((state) => ({
      positions: {
        ...state.positions,
        [id]: position,
      },
    })),
}));
