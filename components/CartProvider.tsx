"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type CartContextValue = {
  /** Quantity of each dish in the cart, keyed by menu item id. */
  items: Record<string, number>;
  count: number;
  addItem: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});

  const addItem = useCallback((id: string) => {
    setItems((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }, []);

  const value = useMemo(
    () => ({ items, addItem, count: Object.values(items).reduce((total, quantity) => total + quantity, 0) }),
    [items, addItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
