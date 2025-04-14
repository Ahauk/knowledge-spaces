import { create } from 'zustand';

type Item = { id: number; x: number; y: number; title: string };
type Connection = {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

type State = {
  items: Item[];
  connections: Connection[];
  addItem: (item: Item) => void;
  addConnection: (conn: Connection) => void;
};

export const useCanvasStore = create<State>((set) => ({
  items: [],
  connections: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  addConnection: (conn) =>
    set((state) => ({ connections: [...state.connections, conn] })),
}));
