import { useSyncExternalStore } from "react";
import type { MenuItem } from "./restaurant-data";

type CartItem = { item: MenuItem; qty: number };
type State = { items: Record<string, CartItem>; isOpen: boolean };

let state: State = { items: {}, isOpen: false };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const cart = {
  add(item: MenuItem) {
    const cur = state.items[item.id];
    state = {
      ...state,
      items: { ...state.items, [item.id]: { item, qty: (cur?.qty ?? 0) + 1 } },
    };
    emit();
  },
  decrement(id: string) {
    const cur = state.items[id];
    if (!cur) return;
    const next = { ...state.items };
    if (cur.qty <= 1) delete next[id];
    else next[id] = { ...cur, qty: cur.qty - 1 };
    state = { ...state, items: next };
    emit();
  },
  remove(id: string) {
    const next = { ...state.items };
    delete next[id];
    state = { ...state, items: next };
    emit();
  },
  clear() {
    state = { ...state, items: {} };
    emit();
  },
  setOpen(open: boolean) {
    state = { ...state, isOpen: open };
    emit();
  },
};

export function useCart() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
}
